package com.stawu.EWT.server.adapter.persistence.workevent;

import org.springframework.data.repository.CrudRepository;

import java.time.Instant;
import java.util.Optional;

public interface WorkEventJpaRepository extends CrudRepository<WorkEventJpaEntity, Long> {
    Iterable<WorkEventJpaEntity> findAllByEmployeeIdAndInstantBetween(long employeeId, Instant from, Instant to);
    Optional<WorkEventJpaEntity> findByEmployeeIdAndInstantEquals(long employeeId, Instant instant);
}
