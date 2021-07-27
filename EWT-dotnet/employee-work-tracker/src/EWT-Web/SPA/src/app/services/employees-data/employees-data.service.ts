import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { EmployeeObject, EmployeeRequestObject, IEmployeesDataService } from './employees-data.interface.service';

@Injectable()
export class EmployeesDataService implements IEmployeesDataService {

  private static readonly SERVER_URL: string = '';//'https://localhost:44386';
  private static readonly EMPLOYEE_ENDPOINT: string = '/api/Employee'
  private static readonly GET_ALL_EMPLOYEES_ENDPOINT: string =  EmployeesDataService.EMPLOYEE_ENDPOINT + '/all'

  constructor(private http: HttpClient){}
  
  getAllEmployees(): Observable<EmployeeObject[]> {
    return this.http.get<EmployeeObject[]>(EmployeesDataService.SERVER_URL + EmployeesDataService.GET_ALL_EMPLOYEES_ENDPOINT);    
  }

  addEmployee(employeeRequestObject: EmployeeRequestObject): Observable<any> {
    return this.http.post(EmployeesDataService.SERVER_URL + EmployeesDataService.EMPLOYEE_ENDPOINT, employeeRequestObject);
  }

  deleteEmployee(employeeId: string): Observable<any>{
    return this.http.delete(EmployeesDataService.SERVER_URL + EmployeesDataService.EMPLOYEE_ENDPOINT + "/" + employeeId);
  }
}
