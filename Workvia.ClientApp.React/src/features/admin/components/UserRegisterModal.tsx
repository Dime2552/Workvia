import { useForm } from 'react-hook-form';
import Modal from '../../../components/Modal';

interface UserRegisterModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export default function UserRegisterModal({ show, onClose, onSuccess }: UserRegisterModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data: any) => {
    onSuccess(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose} title="Register new employee">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Person Name</label>
            <input 
              type="text" 
              className={`form-control ${errors.personName ? 'is-invalid' : ''}`}
              {...register('personName', { required: 'Person name can’t be blank' })}
            />
            {errors.personName && <div className="invalid-feedback">{errors.personName.message as string}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', { 
                required: 'Email can’t be blank',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message as string}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', { required: 'Password can’t be blank' })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message as string}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              {...register('confirmPassword', { required: 'Confirm password can’t be blank' })}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message as string}</div>}
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="isAdmin" {...register('isAdmin')} />
            <label className="form-check-label" htmlFor="isAdmin">Is Admin</label>
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-success">Register</button>
        </div>
      </form>
    </Modal>
  );
}