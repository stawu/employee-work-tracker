import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface DayInformation {
    date: Date;
    dayStatus: string
}

export class ShortWorkSummaryObject {
    minutesOfWork: number;
    startDateTime: Date;
    endDateTime: Date;
    daysStatuses: DayInformation[]

    constructor(
        minutesOfWork: number,
        startDateTime: Date,
        endDateTime: Date,
        daysStatuses: DayInformation[]) 
    {
        this.minutesOfWork = minutesOfWork;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.daysStatuses = daysStatuses;    
    }
}

interface WorkDuration {
    startDateTimeInstant: Date;
    endDateTimeInstant: Date;
}

export class DetailedWorkSummaryObject {
    minutesOfWork: number;
    startDateTime: Date;
    endDateTime: Date;
    workDurations: WorkDuration[]

    constructor(
        minutesOfWork: number,
        startDateTime: Date,
        endDateTime: Date,
        workDurations: WorkDuration[]) 
    {
        this.minutesOfWork = minutesOfWork;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.workDurations = workDurations;    
    }
}

@Injectable()
export abstract class IWorkSummaryDataService {
    abstract getShortWorkSummaryOfEmployeeBetween(
        employeeId: string, fromInclusive: Date, toInclusive: Date): Observable<ShortWorkSummaryObject>

    abstract getDetailedWorkSummaryOfEmployeeBetween(
        employeeId: string, fromInclusive: Date, toInclusive: Date): Observable<DetailedWorkSummaryObject>
}