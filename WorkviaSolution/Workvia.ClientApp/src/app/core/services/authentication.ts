import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register-user';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL: string = "https://localhost:5267/api/account";

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  
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

  public getToken(): string | null {
    return localStorage["token"];
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const role = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      
      return role === 'Admin';
    } catch (e) {
      return false;
    }
  }
}
