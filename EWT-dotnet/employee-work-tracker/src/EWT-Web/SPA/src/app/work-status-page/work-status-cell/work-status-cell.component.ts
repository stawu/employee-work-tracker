import { Component, Input, OnInit } from '@angular/core';
import { DetailedWorkSummaryObject, IWorkSummaryDataService } from 'src/app/services/work-summary-data/work-summary-data.interface.service';

interface WorkDurationParsed {
  startString: string,
  endString: string,
  durationString: string
}

interface WorkInformation {
  workTimeString: string,
  workDurations: WorkDurationParsed[]
}

@Component({
  selector: 'app-work-status-cell',
  templateUrl: './work-status-cell.component.html',
  styleUrls: ['./work-status-cell.component.css']
})
export class WorkStatusCellComponent {

  @Input() dayStatus: 'PROBLEM' | 'PRESENCE' | 'NO_DATA' = 'NO_DATA';
  @Input() employeeId: string | null = null;
  @Input() date: Date | null = null;
  workInformations: WorkInformation | null = null;

  constructor(private workSummaryDataService: IWorkSummaryDataService) { }

  async tryToFetchDetailedWorkSummaryOfSelectedDay(): Promise<void> {
    if(this.employeeId === null || this.date === null || this.dayStatus === 'NO_DATA')
      return;

    const datePlusDay = new Date(this.date);
    datePlusDay.setDate(datePlusDay.getDate() + 1);

    const detailedWorkSummary = await this.workSummaryDataService.getDetailedWorkSummaryOfEmployeeBetween(
      this.employeeId, this.date, datePlusDay).toPromise();

    this.workInformations = {
      workTimeString: detailedWorkSummary.minutesOfWork.toString(),
      workDurations: detailedWorkSummary.workDurations.map<WorkDurationParsed>(workDuration => {

        const start: Date = new Date(workDuration.startDateTimeInstant);
        const end: Date | null = workDuration.endDateTimeInstant ? new Date(workDuration.endDateTimeInstant) : null;

        return {
          startString: start.getHours().toString() + ':' + start.getMinutes().toString(),
          endString: end ? end.getHours().toString() + ':' + end.getMinutes().toString() : '?',
          durationString: end ? (end.getTime() - start.getTime()).toString() : ''
        }
      })
    }
  }
}
