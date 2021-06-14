package com.stawu.EWT.job_reporter_android;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.pm.PackageManager;
import android.hardware.Camera;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.budiyev.android.codescanner.CodeScanner;
import com.budiyev.android.codescanner.CodeScannerView;
import com.budiyev.android.codescanner.DecodeCallback;
import com.google.zxing.Result;

public class MainActivity extends AppCompatActivity {

    private CodeScanner mCodeScanner;
    private ActivityResultLauncher permissionLauncher;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        permissionLauncher = registerForActivityResult(new ActivityResultContracts.RequestPermission(), isGranted ->{
            mCodeScanner.startPreview();
        });

        CodeScannerView scannerView = findViewById(R.id.scanner_view);
        mCodeScanner = new CodeScanner(this, scannerView);
        mCodeScanner.setDecodeCallback(new DecodeCallback() {
            @Override
            public void onDecoded(@NonNull final Result result) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(MainActivity.this, result.getText(), Toast.LENGTH_SHORT).show();
                    }
                });
            }
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