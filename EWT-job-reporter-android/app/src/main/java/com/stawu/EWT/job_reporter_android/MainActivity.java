package com.stawu.EWT.job_reporter_android;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.ContextCompat;
import androidx.room.Room;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.budiyev.android.codescanner.CodeScanner;
import com.budiyev.android.codescanner.CodeScannerView;
import com.budiyev.android.codescanner.ScanMode;

import org.json.JSONObject;

import java.time.Instant;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import io.reactivex.rxjava3.schedulers.Schedulers;

public class MainActivity extends AppCompatActivity {

    private CodeScanner mCodeScanner;
    private ActivityResultLauncher permissionLauncher;
    private RequestQueue requestQueue;
    private volatile boolean allowQrProcessing_cam_thread = true;
    private volatile boolean allowQrProcessing_main_thread = true;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Remove title bar
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);

        //Remove notification bar
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        //set content view AFTER ABOVE sequence (to avoid crash)
        this.setContentView(R.layout.activity_main);

        AppDatabase.singleton = Room.databaseBuilder(this.getApplicationContext(), AppDatabase.class, "main-db").build();

        HttpsTrustManager.allowAllSSL();
        requestQueue = Volley.newRequestQueue(this);

        setContentView(R.layout.activity_main);
        permissionLauncher = registerForActivityResult(new ActivityResultContracts.RequestPermission(), isGranted ->{
            mCodeScanner.startPreview();
        });

        ConstraintLayout constraintLayout = findViewById(R.id.constrain_layout);
        constraintLayout.setVisibility(View.GONE);

        CodeScannerView scannerView = findViewById(R.id.scanner_view);
        mCodeScanner = new CodeScanner(this, scannerView);
        mCodeScanner.setScanMode(ScanMode.SINGLE);
        mCodeScanner.setDecodeCallback(result -> {
            runOnUiThread(() -> {
                if(!allowQrProcessing_main_thread)
                    return;
                allowQrProcessing_main_thread = false;
                constraintLayout.setVisibility(View.VISIBLE);

                Toast.makeText(MainActivity.this, result.getText(), Toast.LENGTH_SHORT).show();

                final Handler handler = new Handler();
                handler.postDelayed(() -> {
                    constraintLayout.setVisibility(View.GONE);
                    mCodeScanner.startPreview();
                }, 5000);
                handler.postDelayed(() -> {
                    this.allowQrProcessing_cam_thread = true;
                    this.allowQrProcessing_main_thread = true;
                    mCodeScanner.startPreview();
                }, 6000);
            });

            if(!allowQrProcessing_cam_thread)
                return;

            allowQrProcessing_cam_thread = false;

            final JobRapport jobRapport = new JobRapport();
            jobRapport.timeStamp = Instant.now().toEpochMilli();
            jobRapport.employeeId = result.getText();
            AppDatabase.singleton.jobRapportDao().insert(jobRapport).subscribeOn(Schedulers.io()).subscribe(() -> {
                AppDatabase.singleton.jobRapportDao().findAll().subscribe(jobRapports -> {
                    for(JobRapport jr : jobRapports){
                        System.out.println(jr.timeStamp);

                        final Map<String, String> jsonParams = new HashMap<>();
                        jsonParams.put("employeeId", jr.employeeId);
                        jsonParams.put("dateTimeInstant", Instant.ofEpochMilli(jr.timeStamp).toString());

                        JSONObject jsonObject = new JSONObject(jsonParams);
                        requestQueue.add(new JsonObjectRequest(Request.Method.POST, "https://192.168.1.230:5001/api/WorkEvent", jsonObject, response -> {
                            AppDatabase.singleton.jobRapportDao().delete(jr).subscribeOn(Schedulers.io()).subscribe(() -> {
                                System.out.println("Deleted");
                            });
                            System.out.println("OK");
                        }, error -> {
                            error.printStackTrace();

                            if(error.networkResponse != null && error.networkResponse.statusCode == 409){//data already in server
                                AppDatabase.singleton.jobRapportDao().delete(jr).subscribeOn(Schedulers.io()).subscribe(() -> {
                                    System.out.println("Deleted");
                                });
                            }
                        }));
                    }
                });
            });
        });

        mCodeScanner.setErrorCallback(error -> {
            error.printStackTrace();
        });

//        scannerView.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                mCodeScanner.startPreview();
//            }
//        });

        final CameraManager cameraManager = (CameraManager) this.getApplicationContext().getSystemService(CAMERA_SERVICE);
        try {
            for (String cameraId : cameraManager.getCameraIdList()) {
                System.out.println(cameraId);
            }
        } catch (CameraAccessException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if(ContextCompat.checkSelfPermission(this.getApplicationContext(), Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED)
            mCodeScanner.startPreview();
        else
            permissionLauncher.launch(Manifest.permission.CAMERA);
    }

    @Override
    protected void onPause() {
        mCodeScanner.releaseResources();
        super.onPause();
    }
}