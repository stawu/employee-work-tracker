package com.stawu.EWT.server.domain;

import lombok.Data;

@Data
public class Employee {

    public static class Id {
        public static final Long UNDEFINED  = null;
    }

    private final Long id;
    private final String name;
    private final String lastName;

    public Employee(String name, String lastName){
        this(Id.UNDEFINED, name, lastName);
    }

    public Employee(Long id, String name, String lastName){
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

        this.id = id;
        this.name = name;
        this.lastName = lastName;
    }
}
