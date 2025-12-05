import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShiftsPerDay } from '../models/stats/shifts-per-day';
import { TopEmployeeStats } from '../models/stats/top-employee-stats';

const API_BASE_URL: string = "https://localhost:5267/api/statistics";

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private httpClient: HttpClient) { }

  public getShiftsPerDay(): Observable<ShiftsPerDay[]> {
    return this.httpClient.get<ShiftsPerDay[]>(`${API_BASE_URL}/shifts-per-day`);
  }

  public getTotalHours(start: Date, end: Date): Observable<number> {
    const params = this.createDateParams(start, end);
    return this.httpClient.get<number>(`${API_BASE_URL}/total-hours`, { params });
  }

  public getTopEmployees(start: Date, end: Date): Observable<TopEmployeeStats[]> {
    const params = this.createDateParams(start, end);
    return this.httpClient.get<TopEmployeeStats[]>(`${API_BASE_URL}/top-employees`, { params });
  }

  public getMyHours(start: Date, end: Date): Observable<number> {
    const params = this.createDateParams(start, end);
    return this.httpClient.get<number>(`${API_BASE_URL}/my-hours`, { params });
  }

  private createDateParams(start: Date, end: Date): HttpParams {
    return new HttpParams()
      .set('start', start.toISOString())
      .set('end', end.toISOString());
  }
}
