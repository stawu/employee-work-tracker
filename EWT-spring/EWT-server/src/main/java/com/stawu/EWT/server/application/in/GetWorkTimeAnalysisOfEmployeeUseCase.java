package com.stawu.EWT.server.application.in;

import com.stawu.EWT.server.domain.WorkTimeAnalysis;
import com.stawu.EWT.server.domain.WorkTimeAnalyzer;

import java.time.LocalDate;

public interface GetWorkTimeAnalysisOfEmployeeUseCase {
    WorkTimeAnalysis getWorkTimeAnalysisOfEmployeeBetween(long employeeId, LocalDate fromInclusive, LocalDate toInclusive);
}
