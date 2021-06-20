package com.stawu.EWT.server.adapter.persistence.workevent;

import com.stawu.EWT.server.adapter.persistence.employee.EmployeeJpaEntity;
import com.stawu.EWT.server.adapter.persistence.employee.EmployeeJpaRepository;
import com.stawu.EWT.server.application.out.EmployeeNotFoundException;
import com.stawu.EWT.server.application.out.PersistWorkEventPort;
import com.stawu.EWT.server.domain.WorkEvent;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Iterator;
import java.util.Optional;

@Component
@AllArgsConstructor
public class WorkEventJpaPersistenceAdapter implements PersistWorkEventPort {

    private final WorkEventJpaRepository workEventJpaRepository;
    private final EmployeeJpaRepository employeeJpaRepository;

    @Override
    public Iterable<WorkEvent> findAllByEmployeeIdBetween(long employeeId, LocalDate fromInclusive, LocalDate toInclusive) {
        final var zoneOffset = ZoneOffset.systemDefault().getRules().getOffset(Instant.now());
        final Instant fromInstantInclusive = fromInclusive.atStartOfDay().toInstant(zoneOffset);
        final Instant toInstantExclusive = toInclusive.plusDays(1).atStartOfDay().toInstant(zoneOffset);

        final var jpaWorkEvents = workEventJpaRepository.findAllByEmployeeIdAndInstantBetween(employeeId, fromInstantInclusive, toInstantExclusive);
        final var jpaWorkEventsIt = jpaWorkEvents.iterator();

        return () -> new Iterator<>() {
            @Override
            public boolean hasNext() {
                return jpaWorkEventsIt.hasNext();
            }

            @Override
            public WorkEvent next() {
                final var jpaWorkEvent = jpaWorkEventsIt.next();

                return new WorkEvent(jpaWorkEvent.getInstant());
            }
        };
    }

    @Override
    public Optional<WorkEvent> findByInstant(long employeeId, Instant instant) {
        final var optWorkEvent = workEventJpaRepository.findByEmployeeIdAndInstantEquals(employeeId, instant);
        if(optWorkEvent.isEmpty())
            return Optional.empty();

        final var workEventJpa = optWorkEvent.get();
        return Optional.of(new WorkEvent(workEventJpa.getInstant()));
    }

    @Override
    public void save(WorkEvent workEvent, long employeeId) throws EmployeeNotFoundException {
        final var optEmployee = employeeJpaRepository.findById(employeeId);
        if(optEmployee.isEmpty())
            throw new EmployeeNotFoundException();

        final EmployeeJpaEntity employeeJpaEntity = optEmployee.get();

        final var workEventJpa = new WorkEventJpaEntity();
        workEventJpa.setEmployee(employeeJpaEntity);
        workEventJpa.setInstant(workEvent.getInstant());

        workEventJpaRepository.save(workEventJpa);
    }
}
