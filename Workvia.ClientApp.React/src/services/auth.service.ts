import api from './api';
import type { LoginRequest, AuthResponse } from '../types/auth';

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/account/login', credentials);
    return response.data;
  },

  register: async (userData: any): Promise<any> => {
    const response = await api.post('/account/register', userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.get('/account/logout');
    localStorage.removeItem("authData");
  },

  getAuthData: (): AuthResponse | null => {
    const data = localStorage.getItem("authData");
    return data ? (JSON.parse(data) as AuthResponse) : null;
  },

  isLoggedIn: (): boolean => {
    const data = AuthService.getAuthData();
    if (!data) return false;
    return new Date(data.expiration) > new Date();
  },

  isAdmin: (): boolean => {
    const data = AuthService.getAuthData();
    return data ? data.role === 'Admin' : false;
  },
  
  getCurrentUserName: (): string | null => {
    const data = AuthService.getAuthData();
    return data ? data.personName : null;
  },

  getUserId: (): string | null => {
    const data = AuthService.getAuthData();
    return data ? data.userId : null;
  }
};