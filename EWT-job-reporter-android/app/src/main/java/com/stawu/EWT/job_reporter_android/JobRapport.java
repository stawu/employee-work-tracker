package com.stawu.EWT.job_reporter_android;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.time.LocalDateTime;

@Entity
public class JobRapport {
    @PrimaryKey(autoGenerate = true)
    public int id;

    public long employeeId;
    public long timeStamp;
}
