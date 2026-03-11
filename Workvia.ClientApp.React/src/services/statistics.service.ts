import api from './api';
import type { ShiftsPerDay, TopEmployeeStats } from '../types/statistics';

export const StatisticsService = {
  getShiftsPerDay: async (): Promise<ShiftsPerDay[]> => {
    const response = await api.get<ShiftsPerDay[]>('/statistics/shifts-per-day');
    return response.data;
  },

  getTotalHours: async (start: Date, end: Date): Promise<number> => {
    const params = new URLSearchParams({ 
        start: start.toISOString(), 
        end: end.toISOString() 
    });
    const response = await api.get<number>(`/statistics/total-hours?${params.toString()}`);
    return response.data;
  },

  getTopEmployees: async (start: Date, end: Date): Promise<TopEmployeeStats[]> => {
    const params = new URLSearchParams({ 
        start: start.toISOString(), 
        end: end.toISOString() 
    });
    const response = await api.get<TopEmployeeStats[]>(`/statistics/top-employees?${params.toString()}`);
    return response.data;
  },

  getMyHours: async (start: Date, end: Date): Promise<number> => {
    const params = new URLSearchParams({ 
        start: start.toISOString(), 
        end: end.toISOString() 
    });
    const response = await api.get<number>(`/statistics/my-hours?${params.toString()}`);
    return response.data;
  }
};