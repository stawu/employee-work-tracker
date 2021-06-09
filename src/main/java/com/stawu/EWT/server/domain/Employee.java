package com.stawu.EWT.server.domain;

import lombok.Data;

@Data
public class Employee {
    private final String name;
    private final String lastName;

    public Employee(String name, String lastName){
        if(name.startsWith(" "))
            throw new IllegalArgumentException("Name can't starts with space!");
        if(lastName.startsWith(" "))
            throw new IllegalArgumentException("LastName can't starts with space!");

        if(name.endsWith(" "))
            throw new IllegalArgumentException("Name can't ends with space!");
        if(lastName.endsWith(" "))
            throw new IllegalArgumentException("LastName can't ends with space!");

        if(!name.matches("^[-a-zA-Z0-9-()]+(\\s+[-a-zA-Z0-9-()]+)*$"))
            throw new IllegalArgumentException("Illegal symbols in name!");

        if(!lastName.matches("^[-a-zA-Z0-9-()]+(\\s+[-a-zA-Z0-9-()]+)*$"))
            throw new IllegalArgumentException("Illegal symbols in lastName!");

        this.name = name;
        this.lastName = lastName;
    }
}
