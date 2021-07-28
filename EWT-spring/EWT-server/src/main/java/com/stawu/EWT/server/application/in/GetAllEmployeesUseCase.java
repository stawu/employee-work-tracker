package com.stawu.EWT.server.application.in;

import com.stawu.EWT.server.domain.Employee;

public interface GetAllEmployeesUseCase {
    Iterable<Employee> getAllEmployees();
}
