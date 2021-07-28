package com.stawu.EWT.server.application.service;

import com.stawu.EWT.server.application.in.AddWorkEventUseCase;
import com.stawu.EWT.server.application.in.SimilarWorkEventAlreadyExistsException;
import com.stawu.EWT.server.application.out.EmployeeNotFoundException;
import com.stawu.EWT.server.application.out.PersistWorkEventPort;
import com.stawu.EWT.server.domain.WorkEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkEventManagementService implements
        AddWorkEventUseCase {

    private final PersistWorkEventPort persistWorkEventPort;

    @Override
    public void addWorkEventToEmployee(WorkEvent workEvent, long employeeId)
            throws SimilarWorkEventAlreadyExistsException, EmployeeNotFoundException {
        final var workEventFromPersist = persistWorkEventPort.findByInstant(employeeId, workEvent.getInstant());
        if(workEventFromPersist.isPresent())
            throw new SimilarWorkEventAlreadyExistsException();

        persistWorkEventPort.save(workEvent, employeeId);
    }
}
