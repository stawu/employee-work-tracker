package com.stawu.EWT.server.adapter.web;

import com.stawu.EWT.server.adapter.persistence.EmployeeDTO;
import com.stawu.EWT.server.application.in.AddEmployeeUseCase;
import com.stawu.EWT.server.application.service.EmployeeManagementService;
import com.stawu.EWT.server.domain.Employee;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class EmployeeController {

    private final AddEmployeeUseCase addEmployeeUseCase;

    @PostMapping("/employees")
    public EmployeeDTO postEmployee(@Valid @RequestBody EmployeeDTO employeeDTO){
        final Employee employee = new Employee(employeeDTO.getName(), employeeDTO.getLastName());
        addEmployeeUseCase.addEmployee(new Employee(employeeDTO.getName(), employee.getLastName()));

        return employeeDTO;
    }
}
