package com.stawu.EWT.server.application.service;

import com.stawu.EWT.server.application.in.AddEmployeeUseCase;
import com.stawu.EWT.server.application.in.DeleteEmployeeUseCase;
import com.stawu.EWT.server.application.in.GetAllEmployeesUseCase;
import com.stawu.EWT.server.application.in.GetWorkTimeAnalysisOfEmployeeUseCase;
import com.stawu.EWT.server.application.out.PersistEmployeePort;
import com.stawu.EWT.server.application.out.PersistWorkEventPort;
import com.stawu.EWT.server.domain.Employee;
import com.stawu.EWT.server.domain.WorkTimeAnalysis;
import com.stawu.EWT.server.domain.WorkTimeAnalyzer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class EmployeeManagementService implements
        AddEmployeeUseCase,
        GetAllEmployeesUseCase,
        DeleteEmployeeUseCase,
        GetWorkTimeAnalysisOfEmployeeUseCase {

    private final PersistEmployeePort persistEmployeePort;
    private final PersistWorkEventPort persistWorkEventPort;

    @Override
    public void addEmployee(Employee employee) {
        persistEmployeePort.save(employee);
    }

    @Override
    public Iterable<Employee> getAllEmployees() {
        return persistEmployeePort.findAll();
    }

    @Override
    public void deleteEmployee(long employeeId) {
        persistEmployeePort.deleteById(employeeId);
    }
    
    @Override
    public WorkTimeAnalysis getWorkTimeAnalysisOfEmployeeBetween(long employeeId, LocalDate fromInclusive, LocalDate toInclusive) {
        if(toInclusive.isBefore(fromInclusive))
            throw new IllegalArgumentException("'toInclusive' is before 'fromInclusive'!");

        final var workEventIt = persistWorkEventPort.findAllByEmployeeIdBetween(employeeId, fromInclusive, toInclusive);

        final WorkTimeAnalyzer workTimeAnalyzer = new WorkTimeAnalyzer();
        workEventIt.forEach(workTimeAnalyzer::addWorkEvent);

        return workTimeAnalyzer;
    }
}
