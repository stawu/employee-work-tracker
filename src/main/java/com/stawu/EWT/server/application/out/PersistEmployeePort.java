package com.stawu.EWT.server.application.out;

import com.stawu.EWT.server.domain.Employee;

public interface PersistEmployeePort {
    void save(Employee employee);
}
