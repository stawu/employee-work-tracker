import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees-page/employees/employees.component';
import { WorkStatusComponent } from './work-status-page/work-status/work-status.component';

const routes: Routes = [
  {
    path: '', 
    component: EmployeesComponent
  },
  {
    path: 'employees', 
    component: EmployeesComponent
  },
  {
    path: 'work-status', 
    component: WorkStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
