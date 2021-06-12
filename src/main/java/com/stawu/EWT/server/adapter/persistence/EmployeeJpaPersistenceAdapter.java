package com.stawu.EWT.server.adapter.persistence;

import com.stawu.EWT.server.application.out.PersistEmployeePort;
import com.stawu.EWT.server.domain.Employee;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.LinkedList;

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

    @Override
    public Iterable<Employee> findAll() {
        final var employees = new LinkedList<Employee>();
        employeeJpaRepository.findAll()
                .forEach(employeeJpaEntity ->
                        employees.add(new Employee(
                            employeeJpaEntity.getId(),
                            employeeJpaEntity.getName(),
                            employeeJpaEntity.getLastName()
                        )));

        return employees;
    }
}
