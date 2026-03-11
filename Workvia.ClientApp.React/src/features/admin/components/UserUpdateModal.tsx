import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/Modal';
import type { User } from '../../../types/user';

interface UserUpdateModalProps {
  show: boolean;
  user: User | null;
  onClose: () => void;
  onSuccess: (data: User) => void;
}

export default function UserUpdateModal({ show, user, onClose, onSuccess }: UserUpdateModalProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<User>();

  useEffect(() => {
    if (user) {
      setValue('id', user.id);
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = (data: User) => {
    onSuccess(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose} title="Update user">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Person Name</label>
            <input 
              type="text" 
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', { required: 'Person name can’t be blank' })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
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
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-success">Update</button>
        </div>
      </form>
    </Modal>
  );
}