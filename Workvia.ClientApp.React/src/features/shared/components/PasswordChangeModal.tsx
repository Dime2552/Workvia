import { useForm } from 'react-hook-form';
import Modal from '../../../components/Modal';

interface PasswordChangeModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export default function PasswordChangeModal({ show, onClose, onSuccess }: PasswordChangeModalProps) {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const newPassword = watch('newPassword');

  const onSubmit = (data: any) => {
    onSuccess(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose} title="Change password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Current password</label>
            <input 
              type="password" 
              className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
              {...register('currentPassword', { required: 'Current password can’t be blank' })}
            />
            {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword.message as string}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">New password</label>
            <input 
              type="password" 
              className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
              {...register('newPassword', { required: 'New password can’t be blank' })}
            />
            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message as string}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm new password</label>
            <input 
              type="password" 
              className={`form-control ${errors.confirmNewPassword ? 'is-invalid' : ''}`}
              {...register('confirmNewPassword', { 
                required: 'Confirm new password can’t be blank',
                validate: value => value === newPassword || 'Passwords do not match'
              })}
            />
            {errors.confirmNewPassword && <div className="invalid-feedback">{errors.confirmNewPassword.message as string}</div>}
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-success">Change</button>
        </div>
      </form>
    </Modal>
  );
}