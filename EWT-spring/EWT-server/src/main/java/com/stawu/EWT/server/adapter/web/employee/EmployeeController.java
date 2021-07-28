package com.stawu.EWT.server.adapter.web.employee;

import com.stawu.EWT.server.application.in.AddEmployeeUseCase;
import com.stawu.EWT.server.application.in.DeleteEmployeeUseCase;
import com.stawu.EWT.server.application.in.GetAllEmployeesUseCase;
import com.stawu.EWT.server.application.in.GetWorkTimeAnalysisOfEmployeeUseCase;
import com.stawu.EWT.server.domain.Employee;
import lombok.AllArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class EmployeeController {

    private final AddEmployeeUseCase addEmployeeUseCase;
    private final GetAllEmployeesUseCase getAllEmployeesUseCase;
    private final DeleteEmployeeUseCase deleteEmployeeUseCase;
    private final GetWorkTimeAnalysisOfEmployeeUseCase getWorkTimeAnalysisOfEmployeeUseCase;

    @PostMapping("/employees")
    public EmployeeDTO_Request postEmployee(@Valid @RequestBody EmployeeDTO_Request employeeDTO_request){
        addEmployeeUseCase.addEmployee(new Employee(employeeDTO_request.getName(), employeeDTO_request.getLastName()));

        return employeeDTO_request;
    }

    @GetMapping("/employees")
    public Iterable<EmployeeDTO_Response> getEmployees(){
        final var employeeDTO_responses = new LinkedList<EmployeeDTO_Response>();

        getAllEmployeesUseCase.getAllEmployees().forEach(employee -> employeeDTO_responses.add(
                new EmployeeDTO_Response(employee.getId(), employee.getName(), employee.getLastName())
        ));

        return employeeDTO_responses;
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable(value = "id") long id){
        try {
            deleteEmployeeUseCase.deleteEmployee(id);
        } catch (EmptyResultDataAccessException e){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok("Entity deleted");
    }

    @GetMapping("/employees/{id}/work-statuses")
    public ResponseEntity<Iterable<WorkStatusDTO_Response>> getEmployeeWorkStatusesBetween(
            @PathVariable(value = "id") long employeeId,
            @RequestParam(name = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromInclusive,
            @RequestParam(name = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toInclusive){
        if(fromInclusive.isAfter(toInclusive))
            return ResponseEntity.badRequest().build();

        final var workTimeAnalysis = getWorkTimeAnalysisOfEmployeeUseCase.getWorkTimeAnalysisOfEmployeeBetween(employeeId, fromInclusive, toInclusive);

        final List<WorkStatusDTO_Response> responseList = new LinkedList<>();
        for (var currentDay = fromInclusive; currentDay.isBefore(toInclusive) ; currentDay = currentDay.plusDays(1)) {
            final var workDurations = workTimeAnalysis.getWorkDurationsOfDay(currentDay);
            if(!workDurations.isEmpty()){
                WorkStatusDTO_Response.Status status = WorkStatusDTO_Response.Status.PRESENT;

                for(final var workDuration : workDurations){
                    if(!workDuration.isComplete())
                        status = WorkStatusDTO_Response.Status.PROBLEM;
                }

                responseList.add(new WorkStatusDTO_Response(currentDay, status));
            }
        }

        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/employees/{id}/work-durations/by-date")
    public Iterable<WorkDurationDTO_Response> getEmployeeWorkDurations(
            @PathVariable("id") long id,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        final var analysis = getWorkTimeAnalysisOfEmployeeUseCase.getWorkTimeAnalysisOfEmployeeBetween(id, date, date);

        final List<WorkDurationDTO_Response> workDurationsDTO = new LinkedList<>();
        analysis.getWorkDurationsOfDay(date).forEach(workDuration -> {
            final Duration duration = workDuration.getDuration();
            final String durationAsString = duration == null ? "" :
                    String.format("%dg %dm", duration.toHoursPart(), duration.toMinutesPart());

            workDurationsDTO.add(new WorkDurationDTO_Response(
                    workDuration.getStartInstant(), workDuration.getEndInstant(), durationAsString));
        });

        return workDurationsDTO;
    }

    @GetMapping("/employees/{id}/work-durations/sum-value")
    public ResponseEntity<WorkDurationDTO_Response> getEmployeeWorkDurationSumValueBetween(
            @PathVariable(value = "id") long employeeId,
            @RequestParam(name = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromInclusive,
            @RequestParam(name = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toInclusive){
        if(fromInclusive.isAfter(toInclusive))
            return ResponseEntity.badRequest().build();

        Instant startInstant = null;
        Instant endInstant = null;
        Duration duration = Duration.ZERO;

        final var analysis = getWorkTimeAnalysisOfEmployeeUseCase.getWorkTimeAnalysisOfEmployeeBetween(employeeId, fromInclusive, toInclusive);
        for (var currentDay = fromInclusive; currentDay.isBefore(toInclusive) ; currentDay = currentDay.plusDays(1)) {
            final var workDurations = analysis.getWorkDurationsOfDay(currentDay);
            for(final var workDuration : workDurations){

                if(workDuration.getStartInstant() != null){
                    if(startInstant == null)
                        startInstant = workDuration.getStartInstant();
                    else if(workDuration.getStartInstant().isBefore(startInstant))
                        startInstant = workDuration.getStartInstant();
                }

                if(workDuration.getEndInstant() != null) {
                    if (endInstant == null)
                        endInstant = workDuration.getEndInstant();
                    else if (workDuration.getEndInstant().isAfter(endInstant))
                        endInstant = workDuration.getEndInstant();
                }

                final var workDurationValue = workDuration.getDuration();
                if(workDurationValue != null)
                    duration = duration.plus(workDurationValue);

            }
        }

        final String durationAsString = String.format("%dg %dm", duration.toHours(), duration.toMinutesPart());

        return ResponseEntity.ok(new WorkDurationDTO_Response(startInstant, endInstant, durationAsString));
    }
}
