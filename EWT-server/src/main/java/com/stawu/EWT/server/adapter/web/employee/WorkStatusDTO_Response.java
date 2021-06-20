package com.stawu.EWT.server.adapter.web.employee;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class WorkStatusDTO_Response {
    public enum Status {
        PRESENT,
        ABSENT,
        PROBLEM
    }

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private final LocalDate date;

    private final Status status;
}
