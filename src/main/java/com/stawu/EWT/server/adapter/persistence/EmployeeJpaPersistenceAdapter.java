package com.stawu.EWT.server.adapter.persistence;

import com.stawu.EWT.server.application.out.PersistEmployeePort;
import com.stawu.EWT.server.domain.Employee;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class EmployeeJpaPersistenceAdapter implements PersistEmployeePort {

    private final EmployeeJpaRepository employeeJpaRepository;

    @Override
    public void save(Employee employee) {
        final EmployeeJpaEntity employeeJpaEntity = new EmployeeJpaEntity();
        employeeJpaEntity.setName(employee.getName());
        employeeJpaEntity.setLastName(employee.getLastName());

        employeeJpaRepository.save(employeeJpaEntity);
    }
}
