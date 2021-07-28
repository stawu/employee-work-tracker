package com.stawu.EWT.server.application.in;

import com.stawu.EWT.server.application.out.EmployeeNotFoundException;
import com.stawu.EWT.server.domain.WorkEvent;

public interface AddWorkEventUseCase {
    void addWorkEventToEmployee(WorkEvent workEvent, long employeeId)
            throws SimilarWorkEventAlreadyExistsException, EmployeeNotFoundException;
}
