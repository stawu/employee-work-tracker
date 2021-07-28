package com.stawu.EWT.server.domain;

import lombok.Data;

import java.time.Duration;
import java.time.Instant;

@Data
public class WorkDuration {

    private Instant startInstant;//todo change to optional
    private Instant endInstant;//todo change to optional

    public void setEndInstant(Instant instant){
        if(startInstant != null) {
            if(instant.isBefore(startInstant))
                throw new IllegalArgumentException("End instant before start instant!");
        }

        this.endInstant = instant;
    }

    public void setStartInstant(Instant instant){
        if(endInstant != null) {
            if(instant.isAfter(endInstant))
                throw new IllegalArgumentException("Start instant after end instant!");
        }

        this.startInstant = instant;
    }

    public boolean isComplete(){
        return startInstant != null && endInstant != null;
    }

    public Duration getDuration(){//todo change to optional
        return startInstant != null && endInstant != null ? Duration.between(startInstant, endInstant) : null;
    }
}
