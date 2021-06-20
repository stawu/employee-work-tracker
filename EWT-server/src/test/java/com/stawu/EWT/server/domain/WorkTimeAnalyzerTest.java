package com.stawu.EWT.server.domain;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.LocalDate;

public class WorkTimeAnalyzerTest {

    @Test
    public void workDurationNotCompleteIfOneEventAdded(){
        final WorkTimeAnalyzer workTimeAnalyzer = new WorkTimeAnalyzer();
        final WorkEvent workEvent = new WorkEvent(Instant.now());

        workTimeAnalyzer.addWorkEvent(workEvent);

        final WorkDuration workDuration = workTimeAnalyzer.getWorkDurationsOfDay(LocalDate.now()).iterator().next();
        Assertions.assertFalse(workDuration.isComplete());
    }

    @Test
    public void workDurationCompleteIfTwoEventsAdded(){
        final WorkTimeAnalyzer workTimeAnalyzer = new WorkTimeAnalyzer();
        final WorkEvent firstWorkEvent = new WorkEvent(Instant.now());
        final WorkEvent secondWorkEvent = new WorkEvent(firstWorkEvent.getInstant().plusMillis(1));

        workTimeAnalyzer.addWorkEvent(firstWorkEvent);
        workTimeAnalyzer.addWorkEvent(secondWorkEvent);

        final WorkDuration workDuration = workTimeAnalyzer.getWorkDurationsOfDay(LocalDate.now()).iterator().next();
        Assertions.assertTrue(workDuration.isComplete());
    }

    @Test
    public void multipleWorkDurationsWhenThreeOrMoreEventsAdded(){
        final WorkTimeAnalyzer workTimeAnalyzer = new WorkTimeAnalyzer();
        final WorkEvent firstWorkEvent = new WorkEvent(Instant.now());
        final WorkEvent secondWorkEvent = new WorkEvent(firstWorkEvent.getInstant().plusMillis(1));
        final WorkEvent thirdWorkEvent = new WorkEvent(firstWorkEvent.getInstant().plusMillis(2));
        final WorkEvent fourthWorkEvent = new WorkEvent(firstWorkEvent.getInstant().plusMillis(3));
        final WorkEvent fifthWorkEvent = new WorkEvent(firstWorkEvent.getInstant().plusMillis(4));

        workTimeAnalyzer.addWorkEvent(firstWorkEvent);
        workTimeAnalyzer.addWorkEvent(secondWorkEvent);
        workTimeAnalyzer.addWorkEvent(thirdWorkEvent);
        workTimeAnalyzer.addWorkEvent(fourthWorkEvent);
        workTimeAnalyzer.addWorkEvent(fifthWorkEvent);

        final var workDurations = workTimeAnalyzer.getWorkDurationsOfDay(LocalDate.now());
        Assertions.assertEquals(3, workDurations.spliterator().getExactSizeIfKnown());
    }

    @Test
    public void getWorkDurationsOfDayReturnEmptyCollection(){
        final WorkTimeAnalyzer workTimeAnalyzer = new WorkTimeAnalyzer();

        final var workDurations = workTimeAnalyzer.getWorkDurationsOfDay(LocalDate.now());
        Assertions.assertTrue(workDurations.isEmpty());
    }

    @Test
    public void getOnlyAnalysisOfAnalyzer(){
        final WorkTimeAnalyzer workTimeAnalyzer = new WorkTimeAnalyzer();
        final WorkEvent firstWorkEvent = new WorkEvent(Instant.now());
        final WorkEvent secondWorkEvent = new WorkEvent(firstWorkEvent.getInstant().plusMillis(1));
        workTimeAnalyzer.addWorkEvent(firstWorkEvent);
        workTimeAnalyzer.addWorkEvent(secondWorkEvent);

        final WorkTimeAnalysis analysis = workTimeAnalyzer;
        Assertions.assertEquals(1, analysis.getWorkDurationsOfDay(LocalDate.now()).spliterator().getExactSizeIfKnown());
    }

//    @Test
//    public void getWorkDurationsBetweenReturnProperValues(){
//        final WorkTimeAnalyzer workTimeAnalyzer = new WorkTimeAnalyzer();
//
//        final LocalDate start = LocalDate.of(2010, 1, 13);
//        final LocalDate end = LocalDate.of(2012, 7, 1);
//        for(var currentDate = start; currentDate.isBefore(end); currentDate = currentDate.plusDays(1)){
//            final WorkEvent startWorkEvent = new WorkEvent(currentDate.atTime(6, 0).toInstant(ZoneOffset.ofHours(0)));
//            final WorkEvent endWorkEvent = new WorkEvent(currentDate.atTime(18, 0).toInstant(ZoneOffset.ofHours(0)));
//            workTimeAnalyzer.addWorkEvent(startWorkEvent);
//            workTimeAnalyzer.addWorkEvent(endWorkEvent);
//        }
//
//        workTimeAnalyzer.getWorkDurationsBetween(start, end);
//    }
//
//    @Test
//    public void getWorkDurationsBetweenReturnSortedByDateValues() {
//
//    }
}
