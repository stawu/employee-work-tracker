import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { EmployeeObject, IEmployeesDataService } from 'src/app/services/employees-data/employees-data.interface.service';

@Component({
  selector: 'app-work-status',
  templateUrl: './work-status.component.html',
  styleUrls: ['./work-status.component.css']
})
export class WorkStatusComponent {

  employeesData: EmployeeObject[] = [];
  selectedDateRange: DateRange<Date> = new DateRange(new Date(Date.now()), new Date(Date.now()));
  selectedRangeString: string = "?";
  

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() {
    this.setToCurrentMonth();
    
    this.range.valueChanges.subscribe((val) => this.dateRangePicked(val));
  }

  dateRangePicked(pickedValues: any) {
    if(pickedValues.start !== null && pickedValues.end !== null){
      this.selectedDateRange = new DateRange(pickedValues.start, pickedValues.end);
      this.selectedRangeString = pickedValues.start
        .toLocaleDateString(undefined, 
        {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
        + ' - ' + pickedValues.end
        .toLocaleDateString(undefined, 
          {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
          })
    }
  }

  setToCurrentMonth(): void {
    const dateNow = new Date(Date.now());
    
    const startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
    const endDate = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0);
    this.selectedDateRange = new DateRange(startDate, endDate);
    this.range.setValue({
      start: startDate,
      end: endDate
    });

    this.setSelectedStringToMonthName();
  }

  setSelectedStringToMonthName(): void {
    if(this.selectedDateRange.start === null){
      this.selectedRangeString = '?';
    }
    else {
      this.selectedRangeString = this.selectedDateRange.start.toLocaleDateString(undefined, 
        {
            month: 'long',
            year: this.selectedDateRange.start.getFullYear() !== new Date(Date.now()).getFullYear() ? 'numeric' : undefined
        });
    }
  }

  nextMonth(): void {
    this.addMonths(1);
  }

  previousMonth(): void {
    this.addMonths(-1);
  }

  addMonths(monthsToAdd: number): void {
    if(this.selectedDateRange.start === null)
      return;

    const startDate = new Date(this.selectedDateRange.start.getFullYear(), this.selectedDateRange.start.getMonth() + monthsToAdd, 1);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    this.selectedDateRange = new DateRange(startDate, endDate);
    this.range.setValue({
      start: startDate,
      end: endDate
    });

    this.setSelectedStringToMonthName();
  }

}
