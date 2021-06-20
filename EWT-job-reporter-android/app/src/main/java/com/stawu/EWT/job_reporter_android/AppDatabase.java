package com.stawu.EWT.job_reporter_android;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {JobRapport.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {
    public static AppDatabase singleton = null;

    public abstract JobRapportDao jobRapportDao();
}
