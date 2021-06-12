package com.stawu.EWT.server.adapter.web;

import com.stawu.EWT.server.application.in.AddEmployeeUseCase;
import com.stawu.EWT.server.application.in.GetAllEmployeesUseCase;
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
    public EmployeeDTO_Request postEmployee(@Valid @RequestBody EmployeeDTO_Request employeeDTO_request){
        addEmployeeUseCase.addEmployee(new Employee(employeeDTO_request.getName(), employeeDTO_request.getLastName()));

        return employeeDTO_request;
    }

    @GetMapping("/employees")
    public Iterable<EmployeeDTO_Response> getEmployees(){
        final var employeeDTO_responses = new LinkedList<EmployeeDTO_Response>();

        getAllEmployeesUseCase.getAllEmployees().forEach(employee -> employeeDTO_responses.add(
                new EmployeeDTO_Response(employee.getId(), employee.getName(), employee.getLastName())
        ));

        return employeeDTO_responses;
    }
}
