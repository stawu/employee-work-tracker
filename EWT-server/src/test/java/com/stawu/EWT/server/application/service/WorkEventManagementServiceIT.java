package com.stawu.EWT.server.application.service;

import com.stawu.EWT.server.application.in.AddWorkEventUseCase;
import com.stawu.EWT.server.application.out.PersistEmployeePort;
import com.stawu.EWT.server.application.out.PersistWorkEventPort;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class WorkEventManagementServiceIT {

    @Autowired
    PersistWorkEventPort persistWorkEventPort;

    @Autowired
    AddWorkEventUseCase addWorkEventUseCase;

    @Test
    public void beansNotNull(){
        Assertions.assertNotNull(persistWorkEventPort);

        //UseCases
        Assertions.assertNotNull(addWorkEventUseCase);
    }
}
