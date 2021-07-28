package com.stawu.EWT.server.domain;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;

public class WorkDurationTest {

    @Test
    public void setInstantHaveProperValue(){
        final WorkDuration workDuration = new WorkDuration();

        final Instant startInstant = Instant.now();
        workDuration.setStartInstant(startInstant);
        Assertions.assertEquals(startInstant, workDuration.getStartInstant());

        final Instant endInstant = Instant.now();
        workDuration.setEndInstant(endInstant);
        Assertions.assertEquals(endInstant, workDuration.getEndInstant());
    }

    @Test
    public void endInstantCanNotBeBeforeStartInstant(){
        final WorkDuration workDuration_01 = new WorkDuration();

        final Instant startInstant = Instant.now();
        final Instant endInstant = startInstant.minusNanos(1);

        workDuration_01.setStartInstant(startInstant);
        Assertions.assertThrows(IllegalArgumentException.class,
                () -> workDuration_01.setEndInstant(endInstant));

        final WorkDuration workDuration_02 = new WorkDuration();
        workDuration_02.setEndInstant(endInstant);
        Assertions.assertThrows(IllegalArgumentException.class,
                () -> workDuration_02.setStartInstant(startInstant));
    }

    @Test
    public void isCompleteReturnFalseWhenStartOrEndInstantNotSet(){
        final WorkDuration workDuration_01 = new WorkDuration();
        Assertions.assertFalse(workDuration_01.isComplete());

        workDuration_01.setStartInstant(Instant.now());
        Assertions.assertFalse(workDuration_01.isComplete());

        final WorkDuration workDuration_02 = new WorkDuration();
        workDuration_02.setEndInstant(Instant.now());
        Assertions.assertFalse(workDuration_02.isComplete());
    }

    @Test
    public void isCompleteReturnTrueWhenStartAndEndInstantSet(){
        final WorkDuration workDuration = new WorkDuration();

        workDuration.setStartInstant(Instant.now());
        workDuration.setEndInstant(Instant.now());

        Assertions.assertTrue(workDuration.isComplete());
    }

    @Test
    public void getDurationReturnCorrectValue(){
        final WorkDuration workDuration = new WorkDuration();
        final var startInstant = Instant.now();
        workDuration.setStartInstant(startInstant);
        final long millis = 789;
        final var endInstant = startInstant.plusMillis(millis);
        workDuration.setEndInstant(endInstant);

        Assertions.assertEquals(millis, workDuration.getDuration().toMillis());
    }

    @Test
    public void getDurationReturnNullWhenNotComplete(){
        final WorkDuration workDuration_01 = new WorkDuration();
        Assertions.assertNull(workDuration_01.getDuration());

        workDuration_01.setStartInstant(Instant.now());
        Assertions.assertNull(workDuration_01.getDuration());

        final WorkDuration workDuration_02 = new WorkDuration();
        workDuration_02.setEndInstant(Instant.now());
        Assertions.assertNull(workDuration_02.getDuration());
    }
}
