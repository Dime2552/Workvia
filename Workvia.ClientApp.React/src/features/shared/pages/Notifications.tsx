import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../services/auth.service';
import type { Notification, NotificationRequest } from '../../../types/notification';
import NotificationCreateModal from '../../admin/components/NotificationCreateModal';

export default function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showCreate, setShowCreate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const isAdmin = AuthService.isAdmin();

    const loadNotifications = async () => {
        setIsLoading(true);
        try {
            const data = await NotificationService.getNotifications();
            setNotifications(data);
        } catch (error) {
            toast.error("Failed to load notifications.");
            console.error("Error loading notifications:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    const handleCreate = async (data: NotificationRequest) => {
        try {
            await NotificationService.createNotification(data);
            toast.success("Notification sent successfully!");
            setShowCreate(false);
            loadNotifications();
        } catch (error) {
            console.error("Failed to create notification", error);
            toast.error("Failed to send notification.");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this notification?')) {
            try {
                await NotificationService.deleteNotification(id);
                toast.success('Notification deleted successfully!');
                setNotifications(currentNotifications => 
                    currentNotifications.filter(n => n.id !== id)
                );
            } catch (error) {
                console.error("Failed to delete notification", error);
                toast.error('Failed to delete notification.');
            }
        }
    };

    if (isLoading) {
        return <div className="text-center mt-5"><p>Loading notifications...</p></div>;
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Notifications</h2>
                {isAdmin && (
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
                        <i className="bi bi-plus-circle me-2"></i> New Notification
                    </button>
                )}
            </div>

            {notifications.length > 0 ? (
                <div className="list-group shadow-sm">
                    {notifications.map(n => (
                        <div key={n.id} className="list-group-item list-group-item-action flex-column align-items-start mb-2 border-0 rounded">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{n.title}</h5>
                                <div className="d-flex align-items-center">
                                    <small className="text-muted me-3">{new Date(n.createdAt).toLocaleString()}</small>
                                    {isAdmin && (
                                        <button 
                                            className="btn btn-sm btn-outline-danger" 
                                            title="Delete"
                                            onClick={() => handleDelete(n.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p className="mb-1" style={{ whiteSpace: 'pre-wrap' }}>{n.message}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-5 card p-4 bg-light border-0">
                    <p className="text-muted fs-5 mb-0">No notifications yet.</p>
                </div>
            )}

            {isAdmin && (
                <NotificationCreateModal
                    show={showCreate}
                    onClose={() => setShowCreate(false)}
                    onSuccess={handleCreate}
                />
            )}
        </div>
    );
}