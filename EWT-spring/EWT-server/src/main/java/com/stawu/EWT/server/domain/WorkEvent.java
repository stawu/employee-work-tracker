package com.stawu.EWT.server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
public class WorkEvent {
    private final Instant instant;
}
