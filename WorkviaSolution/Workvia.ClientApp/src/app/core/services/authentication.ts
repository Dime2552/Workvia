import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register-user';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';

const API_BASE_URL: string = "https://localhost:5267/api/account";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  public currentUserName: string | null = null;

  constructor(private httpClient: HttpClient) {}

  public postRegister(registerUser: RegisterUser): Observable<User>{
    return this.httpClient.post<User>(`${API_BASE_URL}/register`, registerUser);
  }

  public postLogin(loginUser: LoginUser): Observable<any>{
    return this.httpClient.post<any>(`${API_BASE_URL}/login`, loginUser);
  }

  public getLogout(): Observable<string>{
    return this.httpClient.get<string>(`${API_BASE_URL}/logout`);
  }

  public getAuthData(): any {
    const data = localStorage.getItem("authData");
    return data ? JSON.parse(data) : null;
  }

  public getUserId(): string {
    const data = this.getAuthData();
    return data ? data.userId : "";
  }

  public isLoggedIn(): boolean {
    const data = this.getAuthData();
    if (!data) return false;

    return new Date(data.expiration) > new Date();
  }

  public isAdmin(): boolean {
    const data = this.getAuthData();
    return data ? data.role === 'Admin' : false;
  }
}
