package com.stawu.EWT.server.application.service;

import com.stawu.EWT.server.application.in.AddEmployeeUseCase;
import com.stawu.EWT.server.application.out.PersistEmployeePort;
import com.stawu.EWT.server.application.out.PersistWorkEventPort;
import com.stawu.EWT.server.domain.Employee;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.Collections;
import java.util.LinkedList;

public class EmployeeManagementServiceTest {

    final PersistEmployeePort persistEmployeePort = Mockito.mock(PersistEmployeePort.class);
    final PersistWorkEventPort persistWorkEventPort = Mockito.mock(PersistWorkEventPort.class);
    final EmployeeManagementService employeeManagementService = new EmployeeManagementService(persistEmployeePort, persistWorkEventPort);

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

    @Test
    public void workTimeAnalysisOfNonExistingEmployeeIdIsEmpty(){
        final long nonExistingEmployeeId = -1;
        final LocalDate todayDate = LocalDate.now();

        Mockito.when(persistWorkEventPort.findAllByEmployeeIdBetween(nonExistingEmployeeId, todayDate, todayDate))
                .thenReturn(Collections.emptyList());

        final var analysis = employeeManagementService
                .getWorkTimeAnalysisOfEmployeeBetween(nonExistingEmployeeId, todayDate, todayDate);

        Assertions.assertTrue(analysis.getWorkDurationsOfDay(todayDate).isEmpty());
    }

    @Test
    public void workTimeAnalysisBetweenThrowsWhenFromDateIsAfterToDate(){
        final var fromDate = LocalDate.now();
        final var toDate = fromDate.minusDays(1);

        Assertions.assertThrows(IllegalArgumentException.class, () -> {
            employeeManagementService.getWorkTimeAnalysisOfEmployeeBetween(0, fromDate, toDate);
        });
    }
}
