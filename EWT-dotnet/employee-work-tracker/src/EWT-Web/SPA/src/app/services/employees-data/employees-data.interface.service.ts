import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeesDataService } from "./employees-data.service";

export class EmployeeObject {
    id: string;
    name: string;
    lastName: string;

    constructor(id: string, name: string, lastName: string){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
    }
}

export class EmployeeRequestObject {
    name: string;
    lastName: string;

    constructor(name: string, lastName: string){
        this.name = name;
        this.lastName = lastName;
    }
}

@Injectable()
export abstract class IEmployeesDataService {
    abstract getAllEmployees(): Observable<EmployeeObject[]>; 
    abstract addEmployee(employeeRequestObject: EmployeeRequestObject): Observable<any>;
    abstract deleteEmployee(employeeId: string): Observable<any>;
}