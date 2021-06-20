package com.stawu.EWT.server.domain;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;

public class WorkEventTest {

    @Test
    public void properValues(){
        final Instant instant = Instant.now();

        final WorkEvent workEvent = new WorkEvent(instant);

        Assertions.assertEquals(instant, workEvent.getInstant());
    }
}
