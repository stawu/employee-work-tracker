package com.stawu.EWT.server.adapter.persistence.workevent;

import com.stawu.EWT.server.adapter.persistence.employee.EmployeeJpaEntity;
import com.stawu.EWT.server.domain.Employee;
import lombok.Data;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
public class WorkEventJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private EmployeeJpaEntity employee;

    private Instant instant;
}
