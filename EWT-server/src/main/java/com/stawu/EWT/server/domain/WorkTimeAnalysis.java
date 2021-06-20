package com.stawu.EWT.server.domain;

import java.time.LocalDate;
import java.util.Collection;

public interface WorkTimeAnalysis {
    Collection<WorkDuration> getWorkDurationsOfDay(LocalDate dayDate);
}
