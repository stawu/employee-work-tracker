package com.stawu.EWT.server.adapter.web.workevent;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
public class WorkEventDTO_Request {

    @NotNull
    private final Long employeeId;

    @NotNull
    private final Instant instant;
}
