export interface Notification {
    id: string;
    title: string;
    message: string;
    createdAt: string;
}

export interface NotificationRequest {
    title: string;
    message: string;
}