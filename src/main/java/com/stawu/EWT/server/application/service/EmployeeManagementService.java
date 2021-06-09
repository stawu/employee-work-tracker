package com.stawu.EWT.server.application.service;

import com.stawu.EWT.server.application.in.AddEmployeeUseCase;
import com.stawu.EWT.server.application.out.PersistEmployeePort;
import com.stawu.EWT.server.domain.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeManagementService implements AddEmployeeUseCase {

    private final PersistEmployeePort persistEmployeePort;

    @Override
    public void addEmployee(Employee employee) {
        persistEmployeePort.save(employee);
    }
}
