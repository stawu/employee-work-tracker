import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EmployeeObject, IEmployeesDataService } from 'src/app/services/employees-data/employees-data.interface.service';
import { IWorkSummaryDataService } from 'src/app/services/work-summary-data/work-summary-data.interface.service';

@Component({
  selector: 'app-work-status-table',
  templateUrl: './work-status-table.component.html',
  styleUrls: ['./work-status-table.component.css']
})
export class WorkStatusTableComponent implements OnChanges {

  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  selectedPeriodAsOrderedDays: Date[] = [];

  employeesData: EmployeeObject[] = [];
  dayStatusesOfEmployees: any = {};

  constructor(private employeeDataService: IEmployeesDataService, 
    private workSummaryDataService: IWorkSummaryDataService) { }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.tryToCalculateSelectedPeriod();

    if(this.startDate !== null && this.endDate !== null){
      await this.tryToFetchEmployeesDataAsync();
      await this.tryToFetchWorkStatusDataAsync();
    }
  }

  tryToCalculateSelectedPeriod(): void {
    if(this.startDate === null || this.endDate === null)
      return;

    this.selectedPeriodAsOrderedDays = [];
    const fromDate_zeroHour = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
    const toDate_zeroHour = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());

    for (let date = fromDate_zeroHour; date.getTime() <= toDate_zeroHour.getTime(); date.setDate(date.getDate() +1)) {
      this.selectedPeriodAsOrderedDays.push(new Date(date));
    }
  }

  async tryToFetchEmployeesDataAsync(): Promise<void> {
    this.employeesData = await this.employeeDataService.getAllEmployees().toPromise();
  }

  async tryToFetchWorkStatusDataAsync(): Promise<void> {
    if(this.startDate === null || this.endDate === null)
      return;

    for(const employee of this.employeesData){
      const shortWorkSummary = await this.workSummaryDataService.getShortWorkSummaryOfEmployeeBetween(
        employee.id, this.startDate, this.endDate).toPromise();

      this.dayStatusesOfEmployees[employee.id] = shortWorkSummary.daysStatuses.map(
        dayInformation => ({
          date: new Date(dayInformation.date),
          dayStatus: dayInformation.dayStatus
        }));
    }
  }
}
