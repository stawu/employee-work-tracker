import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeObject, IEmployeesDataService } from 'src/app/services/employees-data/employees-data.interface.service';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { DeleteEmployeeDialogComponent } from '../delete-employee-dialog/delete-employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeesData: EmployeeObject[] = [];

  constructor(private dialog: MatDialog, private employeeDataService: IEmployeesDataService) { }

  ngOnInit(): void {
    this.tryToFetchEmployeesData();
  }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined)
        this.tryToFetchEmployeesData();
    });
  }

  tryToFetchEmployeesData(): void {
    this.employeeDataService.getAllEmployees().subscribe(observer => {
      this.employeesData = observer.map(employee => 
        new EmployeeObject(employee.id, employee.name, employee.lastName));
    });
  }

}
