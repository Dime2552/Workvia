import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/Modal';
import { UserService } from '../../../services/user.service';
import type { User } from '../../../types/user';
import type { ShiftRequest } from '../../../types/shift';

interface ShiftCreateModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: (data: ShiftRequest) => void;
}

export default function ShiftCreateModal({ show, onClose, onSuccess }: ShiftCreateModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ShiftRequest>();
  const [employees, setEmployees] = useState<User[]>([]);

  useEffect(() => {
    if (show) {
      UserService.getEmployees().then(setEmployees);
    }
  }, [show]);

  const onSubmit = (data: ShiftRequest) => {
    if (new Date(data.endTime!) <= new Date(data.startTime!)) {
      alert("End time must be after Start time!");
      return;
    }
    onSuccess(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose} title="Add Shift">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Employee</label>
            <select 
              className={`form-select ${errors.employeeId ? 'is-invalid' : ''}`}
              {...register('employeeId', { required: 'Please select an employee' })}
            >
              <option value="">Select an employee...</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name} ({emp.email})</option>
              ))}
            </select>
            {errors.employeeId && <div className="invalid-feedback">{errors.employeeId.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Start Time</label>
            <input 
              type="datetime-local" 
              className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
              {...register('startTime', { required: 'Start time is required' })}
            />
             {errors.startTime && <div className="invalid-feedback">{errors.startTime.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">End Time</label>
            <input 
              type="datetime-local" 
              className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
              {...register('endTime', { required: 'End time is required' })}
            />
             {errors.endTime && <div className="invalid-feedback">{errors.endTime.message}</div>}
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-success">Add Shift</button>
        </div>
      </form>
    </Modal>
  );
}