import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const API_BASE_URL: string = "https://localhost:5267/api";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  public getEmployees(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${API_BASE_URL}/users/employees`);
  }

  public putUpdate(userId: string | null, user: User): Observable<string> {
    return this.httpClient.put<string>(`${API_BASE_URL}/account/${userId}`, user);
  }

  public deleteEmployee(employeeId: string | null): Observable<any>{
    return this.httpClient.delete(`${API_BASE_URL}/account/${employeeId}`);
  }
}
