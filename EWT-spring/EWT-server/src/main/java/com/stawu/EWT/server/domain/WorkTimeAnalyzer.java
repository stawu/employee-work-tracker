package com.stawu.EWT.server.domain;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

public class WorkTimeAnalyzer implements WorkTimeAnalysis {

    private final SortedMap<LocalDate, LinkedList<WorkDuration>> workDurations = new TreeMap<>();

    public void addWorkEvent(WorkEvent workEvent) {
        //todo zapewnij że nawet kiedy work eventy bd dodawane
        //w innej kolejności względem czasu (np. ->11:00 -> 12:00 -> 9:00 -> 13:99(
        //to zmiany w workDurations zostaną posortowane
        final var localDateFromWorkEvent = LocalDate.ofInstant(workEvent.getInstant(), ZoneId.systemDefault());
        workDurations.putIfAbsent(localDateFromWorkEvent, new LinkedList<>());
        final var workDurationsOfDay = workDurations.get(localDateFromWorkEvent);

        if(workDurationsOfDay.isEmpty())
            workDurationsOfDay.addLast(new WorkDuration());

        final WorkDuration workDuration = workDurationsOfDay.getLast();
        if(workDuration.getStartInstant() == null)
            workDuration.setStartInstant(workEvent.getInstant());
        else if(workDuration.getEndInstant() == null)
            workDuration.setEndInstant(workEvent.getInstant());
        else {
            workDurationsOfDay.addLast(new WorkDuration());
            addWorkEvent(workEvent);
        }
    }

    @Override
    public Collection<WorkDuration> getWorkDurationsOfDay(LocalDate dayDate) {
        final var durations = workDurations.get(dayDate);
        if(durations == null)
            return Collections.emptyList();

        return durations;
    }

//    public Iterable<WorkDuration> getWorkDurationsBetween(LocalDate from, LocalDate to) {
//        return workDurations.subMap(from, to).values().;
//    }
}
