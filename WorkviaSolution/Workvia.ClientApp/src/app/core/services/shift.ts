import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShiftResponse } from '../models/shift-response';
import { ShiftRequest } from '../models/shift-request';

const API_BASE_URL: string = "https://localhost:5267/api";

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  constructor(private httpClient: HttpClient) { }

  public getShifts(): Observable<ShiftResponse[]> {
    return this.httpClient.get<ShiftResponse[]>(`${API_BASE_URL}/shifts`);
  }

  public getShiftsOfEmployee(employeeId: string | null): Observable<ShiftResponse[]> {
    return this.httpClient.get<ShiftResponse[]>(`${API_BASE_URL}/shifts/employee/${employeeId}`);
  }

  public getShiftDetails(shiftId: string | null): Observable<ShiftResponse> {
    return this.httpClient.get<ShiftResponse>(`${API_BASE_URL}/shifts/details/${shiftId}`);
  }

  public updateShift(shiftId: string | null, shift: ShiftRequest): Observable<any> {
    return this.httpClient.put<any>(`${API_BASE_URL}/shifts/${shiftId}`, shift);
  }

  public postShift(shift: ShiftRequest): Observable<ShiftResponse> {
    return this.httpClient.post<ShiftResponse>(`${API_BASE_URL}/shifts`, shift);
  }

  public deleteShift(shiftId: string | null): Observable<any>{
    return this.httpClient.delete(`${API_BASE_URL}/shifts/${shiftId}`);
  }
}
