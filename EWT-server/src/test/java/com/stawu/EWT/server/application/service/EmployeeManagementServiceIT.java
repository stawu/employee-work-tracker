package com.stawu.EWT.server.application.service;

import com.stawu.EWT.server.adapter.persistence.EmployeeJpaPersistenceAdapter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmployeeManagementServiceIT {

    @Autowired
    EmployeeJpaPersistenceAdapter employeeJpaPersistenceAdapter;

    @Test
    public void beansNotNull(){
        Assertions.assertNotNull(employeeJpaPersistenceAdapter);
    }
}
