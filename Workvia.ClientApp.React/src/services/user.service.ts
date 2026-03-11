import api from './api';
import type { User } from '../types/user';

export const UserService = {
  getEmployees: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users/employees');
    return response.data;
  },

  updateUser: async (userId: string, userData: any): Promise<void> => {
    await api.put(`/account/${userId}`, userData);
  },

  changePassword: async (passwordData: any): Promise<void> => {
    await api.put('/account/change-password', passwordData);
  },

  deleteEmployee: async (employeeId: string): Promise<void> => {
    await api.delete(`/account/${employeeId}`);
  }
};