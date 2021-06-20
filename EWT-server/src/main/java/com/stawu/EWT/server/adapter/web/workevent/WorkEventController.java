package com.stawu.EWT.server.adapter.web.workevent;

import com.stawu.EWT.server.adapter.web.employee.EmployeeDTO_Request;
import com.stawu.EWT.server.application.in.AddWorkEventUseCase;
import com.stawu.EWT.server.application.in.GetWorkTimeAnalysisOfEmployeeUseCase;
import com.stawu.EWT.server.application.in.SimilarWorkEventAlreadyExistsException;
import com.stawu.EWT.server.application.out.EmployeeNotFoundException;
import com.stawu.EWT.server.domain.Employee;
import com.stawu.EWT.server.domain.WorkEvent;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class WorkEventController {

    private final AddWorkEventUseCase addWorkEventUseCase;

    @PostMapping("/work-events")
    public ResponseEntity<WorkEventDTO_Request> postWorkEvent(@Valid @RequestBody WorkEventDTO_Request workEventDTO_request){
        final var employeeId = workEventDTO_request.getEmployeeId();
        final WorkEvent workEvent = new WorkEvent(workEventDTO_request.getInstant());

        try {
            addWorkEventUseCase.addWorkEventToEmployee(workEvent, employeeId);
        } catch (SimilarWorkEventAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (EmployeeNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(workEventDTO_request);
    }
}
