import api from './api';
import type { Notification, NotificationRequest } from '../types/notification';

export const NotificationService = {
    getNotifications: async (): Promise<Notification[]> => {
        const response = await api.get<Notification[]>('/notifications');
        return response.data;
    },

    createNotification: async (data: NotificationRequest): Promise<Notification> => {
        const response = await api.post<Notification>('/notifications', data);
        return response.data;
    },

    deleteNotification: async (id: string): Promise<void> => {
        await api.delete(`/notifications/${id}`);
    }
};