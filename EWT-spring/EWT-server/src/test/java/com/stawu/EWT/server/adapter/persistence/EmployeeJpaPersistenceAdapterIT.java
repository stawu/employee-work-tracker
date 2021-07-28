package com.stawu.EWT.server.adapter.persistence;

import com.stawu.EWT.server.adapter.persistence.employee.EmployeeJpaPersistenceAdapter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmployeeJpaPersistenceAdapterIT {

    @Autowired
    EmployeeJpaPersistenceAdapter employeeJpaPersistenceAdapter;

    @Test
    public void beansInjected(){
        Assertions.assertNotNull(employeeJpaPersistenceAdapter);
    }
}
