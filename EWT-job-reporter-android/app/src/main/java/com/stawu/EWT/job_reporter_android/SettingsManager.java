package com.stawu.EWT.job_reporter_android;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;

import androidx.preference.PreferenceManager;

import java.util.Optional;

public class SettingsManager {

    private SharedPreferences sharedPreferences;

    public SettingsManager(Activity activity){
        this.sharedPreferences = PreferenceManager.getDefaultSharedPreferences(activity);
    }

    public Optional<String> getServerAddress(){
        final String address = sharedPreferences.getString("SERVER_ADDRESS", "");
        return address.equals("") ? Optional.empty() : Optional.of(address);
    }
}
