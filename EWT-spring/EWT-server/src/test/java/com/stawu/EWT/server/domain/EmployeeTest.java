package com.stawu.EWT.server.domain;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class EmployeeTest {

    @Test
    public void initRequiredFields(){
        final Employee employee = new Employee("Name", "LastName");
        Assertions.assertEquals("Name", employee.getName());
        Assertions.assertEquals("LastName", employee.getLastName());
    }

    @Test
    public void defaultIdIsUndefined(){
        final Employee employee = new Employee("Name", "LastName");
        Assertions.assertEquals(Employee.Id.UNDEFINED, employee.getId());
    }

    @Test
    public void constructedIdValueCorrect(){
        final Employee employee = new Employee(0L, "Name", "LastName");
        Assertions.assertEquals(0L, employee.getId());
    }

    @Test
    public void throwExceptionWhenNameOrLastNameIsBlank(){
        Assertions.assertThrows(IllegalArgumentException.class, () -> new Employee("", "LastName"));
        Assertions.assertThrows(IllegalArgumentException.class, () -> new Employee("Name", ""));
    }

    @Test
    public void throwExceptionWhenSpaceBeforeNameOrLastName(){
        Assertions.assertThrows(IllegalArgumentException.class, () -> new Employee(" Name", "LastName"));
        Assertions.assertThrows(IllegalArgumentException.class, () -> new Employee("Name", " LastName"));
    }

    @Test
    public void throwExceptionWhenSpaceAfterNameOrLastName(){
        Assertions.assertThrows(IllegalArgumentException.class, () -> new Employee("Name ", "LastName"));
        Assertions.assertThrows(IllegalArgumentException.class, () -> new Employee("Name", "LastName "));
    }

    @Test
    public void throwExceptionWhenNameOrLastNameContainsIllegalSymbols(){
        Assertions.assertThrows(IllegalArgumentException.class, () ->
                new Employee("Name;", "LastName"));
        Assertions.assertThrows(IllegalArgumentException.class, () ->
                new Employee("Name", "LastName;"));
    }
}
