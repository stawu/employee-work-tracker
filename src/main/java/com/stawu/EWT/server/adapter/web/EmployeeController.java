package com.stawu.EWT.server.adapter.web;

import com.stawu.EWT.server.adapter.persistence.EmployeeDTO;
import com.stawu.EWT.server.application.in.AddEmployeeUseCase;
import com.stawu.EWT.server.application.in.GetAllEmployeesUseCase;
import com.stawu.EWT.server.application.service.EmployeeManagementService;
import com.stawu.EWT.server.domain.Employee;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.LinkedList;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class EmployeeController {

    private final AddEmployeeUseCase addEmployeeUseCase;
    private final GetAllEmployeesUseCase getAllEmployeesUseCase;

    @PostMapping("/employees")
    public EmployeeDTO postEmployee(@Valid @RequestBody EmployeeDTO employeeDTO){
        final Employee employee = new Employee(employeeDTO.getName(), employeeDTO.getLastName());
        addEmployeeUseCase.addEmployee(new Employee(employeeDTO.getName(), employee.getLastName()));

        return employeeDTO;
    }

    @GetMapping("/employees")
    public Iterable<EmployeeDTO> getEmployees(){
        final var employeesDTO = new LinkedList<EmployeeDTO>();

        getAllEmployeesUseCase.getAllEmployees().forEach(employee -> employeesDTO.add(
                new EmployeeDTO(employee.getName(), employee.getLastName())
        ));

        return employeesDTO;
    }
}
