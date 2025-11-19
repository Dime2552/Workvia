import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const API_BASE_URL: string = "https://localhost:5267/api/users";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public getEmployees(): Observable<User[]>{
      return this.httpClient.get<User[]>(`${API_BASE_URL}/employees`);
    }
}
