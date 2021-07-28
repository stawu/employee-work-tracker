package com.stawu.EWT.server.application.service;

import com.stawu.EWT.server.adapter.persistence.employee.EmployeeJpaPersistenceAdapter;
import com.stawu.EWT.server.adapter.persistence.workevent.WorkEventJpaPersistenceAdapter;
import com.stawu.EWT.server.application.in.AddEmployeeUseCase;
import com.stawu.EWT.server.application.in.DeleteEmployeeUseCase;
import com.stawu.EWT.server.application.in.GetAllEmployeesUseCase;
import com.stawu.EWT.server.application.in.GetWorkTimeAnalysisOfEmployeeUseCase;
import com.stawu.EWT.server.application.out.PersistEmployeePort;
import com.stawu.EWT.server.application.out.PersistWorkEventPort;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmployeeManagementServiceIT {

    @Autowired
    PersistEmployeePort persistEmployeePort;
    @Autowired
    PersistWorkEventPort persistWorkEventPort;

    @Autowired
    AddEmployeeUseCase addEmployeeUseCase;
    @Autowired
    GetAllEmployeesUseCase getAllEmployeesUseCase;
    @Autowired
    DeleteEmployeeUseCase deleteEmployeeUseCase;
    @Autowired
    GetWorkTimeAnalysisOfEmployeeUseCase getWorkTimeAnalysisOfEmployeeUseCase;

    @Test
    public void beansNotNull(){
        Assertions.assertNotNull(persistEmployeePort);
        Assertions.assertNotNull(persistWorkEventPort);

        //UseCases
        Assertions.assertNotNull(addEmployeeUseCase);
        Assertions.assertNotNull(getAllEmployeesUseCase);
        Assertions.assertNotNull(deleteEmployeeUseCase);
        Assertions.assertNotNull(getWorkTimeAnalysisOfEmployeeUseCase);
    }
}
