import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainSidenavComponent } from './main-sidenav/main-sidenav.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { EmployeesComponent } from './employees-page/employees/employees.component';
import { EmployeesTableComponent } from './employees-page/employees-table/employees-table.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesDataService } from './services/employees-data/employees-data.service';
import { IEmployeesDataService } from './services/employees-data/employees-data.interface.service';
import { AddEmployeeDialogComponent } from './employees-page/add-employee-dialog/add-employee-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import { DeleteEmployeeDialogComponent } from './employees-page/delete-employee-dialog/delete-employee-dialog.component';

import { QRCodeModule } from 'angularx-qrcode';
import { QrBadgeComponent } from './employees-page/qr-badge/qr-badge.component';
import { QrBadgesSnapshotComponent } from './employees-page/qr-badges-snapshot/qr-badges-snapshot.component';
import { WorkStatusComponent } from './work-status-page/work-status/work-status.component';
import { EmployeeWorkStatusRowComponent } from './work-status-page/employee-work-status-row/employee-work-status-row.component';
import { WorkStatusTableComponent } from './work-status-page/work-status-table/work-status-table.component';
import { IWorkSummaryDataService } from './services/work-summary-data/work-summary-data.interface.service';
import { WorkSummaryDataService } from './services/work-summary-data/work-summary-data.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { WorkStatusCellComponent } from './work-status-page/work-status-cell/work-status-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MainSidenavComponent,
    MainToolbarComponent,
    EmployeesComponent,
    EmployeesTableComponent,
    AddEmployeeDialogComponent,
    DeleteEmployeeDialogComponent,
    QrBadgeComponent,
    QrBadgesSnapshotComponent,
    WorkStatusComponent,
    EmployeeWorkStatusRowComponent,
    WorkStatusTableComponent,
    WorkStatusCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    QRCodeModule,

    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatMenuModule
  ],
  providers: [
    { provide: IEmployeesDataService, useClass: EmployeesDataService },
    { provide: IWorkSummaryDataService, useClass: WorkSummaryDataService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
