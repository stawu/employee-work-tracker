package com.stawu.EWT.job_reporter_android;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;

import java.util.List;

import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Single;

@Dao
public interface JobRapportDao {

    @Query("SELECT * FROM jobrapport")
    Single<List<JobRapport>> findAll();

    @Insert
    Completable insert(JobRapport jobRapport);

    @Delete
    Completable delete(JobRapport jobRapports);
}
