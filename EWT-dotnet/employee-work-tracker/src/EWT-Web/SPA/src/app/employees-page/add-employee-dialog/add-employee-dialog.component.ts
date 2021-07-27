import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeRequestObject, IEmployeesDataService } from 'src/app/services/employees-data/employees-data.interface.service';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.css']
})
export class AddEmployeeDialogComponent {

  name: string = '';
  lastName: string = '';
  addingInProgress: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    private employeeDataService: IEmployeesDataService) { }

    closeDialog(){
      this.dialogRef.close();
    }

    addEmployee(){
      this.addingInProgress = true;

      const employeeRequestObject = new EmployeeRequestObject(this.name, this.lastName)
      this.employeeDataService.addEmployee(employeeRequestObject).subscribe( 
        (value) => {console.log(value)}, 
        (error) => {
          this.addingInProgress = false;
          console.log(error)
        }, 
        () => {
          this.addingInProgress = false;
          this.dialogRef.close(employeeRequestObject);
          console.log("DONE")
        });
    }
}
