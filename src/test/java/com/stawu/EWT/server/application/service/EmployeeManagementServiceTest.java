package com.stawu.EWT.server.application.service;

import com.stawu.EWT.server.application.in.AddEmployeeUseCase;
import com.stawu.EWT.server.application.out.PersistEmployeePort;
import com.stawu.EWT.server.domain.Employee;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.LinkedList;

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

    @Test
    public void getAllEmployeeFromPersistenceStorage(){
        final var employees = new LinkedList<Employee>();
        employees.add(new Employee("name01", "lastName01"));
        employees.add(new Employee("name02", "lastName02"));
        employees.add(new Employee("name03", "lastName03"));

        Mockito.when(persistEmployeePort.findAll())
                .thenReturn(employees);

        Assertions.assertEquals(employees, employeeManagementService.getAllEmployees());
    }

    @Test
    public void removeEmployeeFromPersistenceStorage(){
        employeeManagementService.deleteEmployee(0);

        Mockito.verify(persistEmployeePort, Mockito.times(1)).deleteById(0);
    }
}
