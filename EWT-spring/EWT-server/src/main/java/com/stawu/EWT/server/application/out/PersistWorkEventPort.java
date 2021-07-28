package com.stawu.EWT.server.application.out;

import com.stawu.EWT.server.domain.Employee;
import com.stawu.EWT.server.domain.WorkEvent;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Optional;

public interface PersistWorkEventPort {
    Iterable<WorkEvent> findAllByEmployeeIdBetween(long employeeId, LocalDate fromInclusive, LocalDate toInclusive);
    Optional<WorkEvent> findByInstant(long employeeId, Instant instant);
    void save(WorkEvent workEvent, long employeeId) throws EmployeeNotFoundException;
}
