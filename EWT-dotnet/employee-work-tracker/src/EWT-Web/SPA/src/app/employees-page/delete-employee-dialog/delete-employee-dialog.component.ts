import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeObject, IEmployeesDataService } from 'src/app/services/employees-data/employees-data.interface.service';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';

export interface DialogData {
  employeesToDelete: EmployeeObject[]
}

@Component({
  selector: 'app-delete-employee-dialog',
  templateUrl: './delete-employee-dialog.component.html',
  styleUrls: ['./delete-employee-dialog.component.css']
})
export class DeleteEmployeeDialogComponent {

  deletingInProgress: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private employeeDataService: IEmployeesDataService) { }

  
  closeDialog(): void {
    this.dialogRef.close();
  }

  async deleteEmployees(): Promise<void> {
    var removedEmployees = [];
    this.deletingInProgress = true;

    for(const employee of this.data.employeesToDelete){
      try {
        await this.employeeDataService.deleteEmployee(employee.id).toPromise();
        removedEmployees.push(employee);
      }
      catch(e){
        console.error(e);
      }
    }

    this.deletingInProgress = false;
    console.log(removedEmployees);
    this.dialogRef.close(removedEmployees);
  }
}
