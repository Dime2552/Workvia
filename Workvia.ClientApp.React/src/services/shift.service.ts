import api from './api';
import type { Shift, ShiftRequest } from '../types/shift';

export const ShiftService = {
  getShifts: async (): Promise<Shift[]> => {
    const response = await api.get<Shift[]>('/shifts');
    return response.data;
  },

  getShiftsOfEmployee: async (employeeId: string): Promise<Shift[]> => {
    const response = await api.get<Shift[]>(`/shifts/employee/${employeeId}`);
    return response.data;
  },
  
  createShift: async (shift: ShiftRequest): Promise<Shift> => {
    const response = await api.post<Shift>('/shifts', shift);
    return response.data;
  },

  updateShift: async (shiftId: string, shift: ShiftRequest): Promise<void> => {
    await api.put(`/shifts/${shiftId}`, shift);
  },

  deleteShift: async (shiftId: string): Promise<void> => {
    await api.delete(`/shifts/${shiftId}`);
  }
};