export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface AuthResponse {
  token?: string;
  userId: string;
  personName: string;
  email: string;
  role: string;
  expiration: string;
}