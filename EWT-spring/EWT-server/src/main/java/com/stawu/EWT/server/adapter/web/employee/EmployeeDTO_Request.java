package com.stawu.EWT.server.adapter.web.employee;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class EmployeeDTO_Request {

    @NotBlank
    @Pattern(regexp = "^[-a-zA-Z0-9-()]+(\\s+[-a-zA-Z0-9-()]+)*$")
    private final String name;
    @NotBlank
    @Pattern(regexp = "^[-a-zA-Z0-9-()]+(\\s+[-a-zA-Z0-9-()]+)*$")
    private final String lastName;
}
