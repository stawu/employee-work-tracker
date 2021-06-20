package com.stawu.EWT.server.application.service;

import com.stawu.EWT.server.application.in.SimilarWorkEventAlreadyExistsException;
import com.stawu.EWT.server.application.out.EmployeeNotFoundException;
import com.stawu.EWT.server.application.out.PersistWorkEventPort;
import com.stawu.EWT.server.domain.WorkEvent;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.Instant;
import java.util.Optional;

public class WorkEventManagementServiceTest {

    final PersistWorkEventPort persistWorkEventPort = Mockito.mock(PersistWorkEventPort.class);
    final WorkEventManagementService workEventManagementService = new WorkEventManagementService(persistWorkEventPort);

    @Test
    public void saveAddedWorkEventInPersistenceStorage() throws SimilarWorkEventAlreadyExistsException, EmployeeNotFoundException {
        final long employeeId = 0;
        final WorkEvent workEvent = new WorkEvent(Instant.now());

        Mockito.when(persistWorkEventPort.findByInstant(employeeId, workEvent.getInstant())).thenReturn(Optional.empty());

        workEventManagementService.addWorkEventToEmployee(workEvent, employeeId);

        Mockito.verify(persistWorkEventPort, Mockito.times(1)).save(workEvent, employeeId);
    }

    @Test
    public void throwsWhenAddingTheSameEvent(){
        final long employeeId = 0;
        final WorkEvent workEvent = new WorkEvent(Instant.now());

        Mockito.when(persistWorkEventPort.findByInstant(employeeId, workEvent.getInstant())).thenReturn(Optional.of(workEvent));

        Assertions.assertThrows(SimilarWorkEventAlreadyExistsException.class, () -> {
           workEventManagementService.addWorkEventToEmployee(workEvent, employeeId);
        });
    }

}
