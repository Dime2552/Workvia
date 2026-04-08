import { useForm } from 'react-hook-form';
import Modal from '../../../components/Modal';
import type { NotificationRequest } from '../../../types/notification';

interface NotificationCreateModalProps {
    show: boolean;
    onClose: () => void;
    onSuccess: (data: NotificationRequest) => void;
}

export default function NotificationCreateModal({ show, onClose, onSuccess }: NotificationCreateModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<NotificationRequest>();

    const onSubmit = (data: NotificationRequest) => {
        onSuccess(data);
        reset();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose} title="Create Notification">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input 
                            type="text" 
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea 
                            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                            rows={4}
                            {...register('message', { required: 'Message is required' })}
                        />
                        {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Send</button>
                </div>
            </form>
        </Modal>
    );
}