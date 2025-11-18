import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register-user';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';

const API_BASE_URL: string = "https://localhost:5267/api/account";

@Injectable({
  providedIn: 'root',
})
export class Account {
  
  public currentUserName: string | null = null;

  constructor(private httpClient: HttpClient) {}

  public postRegister(registerUser: RegisterUser): Observable<User>{
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${localStorage["token"]}`);
    return this.httpClient.post<User>(`${API_BASE_URL}/register`, registerUser, {headers: headers});
  }

  public postLogin(loginUser: LoginUser): Observable<any>{
    return this.httpClient.post<any>(`${API_BASE_URL}/login`, loginUser);
  }

  public getLogout(): Observable<string>{
    return this.httpClient.get<string>(`${API_BASE_URL}/logout`);
  }

}
