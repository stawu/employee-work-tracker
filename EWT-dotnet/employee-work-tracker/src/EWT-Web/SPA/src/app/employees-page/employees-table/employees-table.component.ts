import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { EmployeeObject, IEmployeesDataService } from 'src/app/services/employees-data/employees-data.interface.service';
import { QrBadgeGeneratorService } from 'src/app/services/qr-badge-generator/qr-badge-generator.service';
import { DeleteEmployeeDialogComponent } from '../delete-employee-dialog/delete-employee-dialog.component';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {

  @Input() employeesData: EmployeeObject[] = [];
  displayedColumns: string[] = ['select', 'name', 'lastName'];
  selectedEmployees = new SelectionModel<EmployeeObject>(true, []);

  constructor(private dialog: MatDialog, 
    private employeeDataService: IEmployeesDataService, 
    private qrBadgeGeneratorService: QrBadgeGeneratorService) { }

  isAllSelected(): boolean {
    return this.selectedEmployees.selected.length === this.employeesData.length
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selectedEmployees.clear();
      return;
    }

    this.selectedEmployees.select(...this.employeesData);
  }

  openDeleteEmployeeDialog(): void {
    const dialogRef = this.dialog.open(DeleteEmployeeDialogComponent, {
      data: {
        employeesToDelete: this.selectedEmployees.selected
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.employeesData = this.employeesData.filter((employee) => !result.includes(employee));
      result.forEach((employee: EmployeeObject) => this.selectedEmployees.deselect(employee));
    });
  }
}
