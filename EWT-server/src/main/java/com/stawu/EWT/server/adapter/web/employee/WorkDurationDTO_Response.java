package com.stawu.EWT.server.adapter.web.employee;

import lombok.Data;

import java.time.Instant;

@Data
public class WorkDurationDTO_Response {
    private final Instant startInstant;
    private final Instant endInstant;
    private final String duration;
}
