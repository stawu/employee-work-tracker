import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { DetailedWorkSummaryObject, IWorkSummaryDataService, ShortWorkSummaryObject } from './work-summary-data.interface.service';

@Injectable()
export class WorkSummaryDataService implements IWorkSummaryDataService {

  private static readonly SERVER_URL: string = '';//'https://localhost:44386';
  private static readonly WORK_SUMMARY_ENDPOINT: string = '/api/WorkSummary';

  constructor(private http: HttpClient){}

  getShortWorkSummaryOfEmployeeBetween(employeeId: string, fromInclusive: Date, toInclusive: Date): Observable<ShortWorkSummaryObject> {
    const params = new HttpParams()
      .set("fromInclusive", fromInclusive.toUTCString())
      .set("toInclusive", toInclusive.toUTCString());

    return this.http.get<ShortWorkSummaryObject>(
      WorkSummaryDataService.SERVER_URL + WorkSummaryDataService.WORK_SUMMARY_ENDPOINT 
          + '/' + encodeURIComponent(employeeId) + '/short'
        , { params: params });    
  }

  getDetailedWorkSummaryOfEmployeeBetween(employeeId: string, fromInclusive: Date, toInclusive: Date): Observable<DetailedWorkSummaryObject> {
    const params = new HttpParams()
      .set("fromInclusive", fromInclusive.toUTCString())
      .set("toInclusive", toInclusive.toUTCString());

    return this.http.get<DetailedWorkSummaryObject>(
      WorkSummaryDataService.SERVER_URL + WorkSummaryDataService.WORK_SUMMARY_ENDPOINT 
          + '/' + encodeURIComponent(employeeId) + '/detailed'
        , { params: params });    
  }
}
