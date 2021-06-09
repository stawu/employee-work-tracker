package com.stawu.EWT.server.application.service;

import com.stawu.EWT.server.application.in.AddEmployeeUseCase;
import com.stawu.EWT.server.application.out.PersistEmployeePort;
import com.stawu.EWT.server.domain.Employee;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class EmployeeManagementServiceTest {

    final PersistEmployeePort persistEmployeePort = Mockito.mock(PersistEmployeePort.class);
    final EmployeeManagementService employeeManagementService = new EmployeeManagementService(persistEmployeePort);

    @Test
    public void implementsAddEmployeeUseCase(){
        final AddEmployeeUseCase addEmployeeUseCase = employeeManagementService;
    }

    @Test
    public void saveAddedEmployeeInPersistenceStorage(){
        final Employee employee = new Employee("Name", "LastName");

        employeeManagementService.addEmployee(employee);

        Mockito.verify(persistEmployeePort, Mockito.times(1)).save(employee);
    }
}
