import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/Modal';
import { UserService } from '../../../services/user.service';
import type { User } from '../../../types/user';
import type { Shift, ShiftRequest } from '../../../types/shift';

interface ShiftUpdateModalProps {
  show: boolean;
  shift: Shift | null;
  onClose: () => void;
  onSuccess: (action: 'update' | 'delete', data?: ShiftRequest) => void;
}

// Helper to format date for datetime-local input
const formatDateForInput = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60000));
  return localDate.toISOString().slice(0, 16);
};

export default function ShiftUpdateModal({ show, shift, onClose, onSuccess }: ShiftUpdateModalProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ShiftRequest>();
  const [employees, setEmployees] = useState<User[]>([]);

  useEffect(() => {
    if (show) {
      UserService.getEmployees().then(setEmployees);
      if (shift) {
        setValue('employeeId', shift.employeeID);
        setValue('startTime', formatDateForInput(shift.startTime));
        setValue('endTime', formatDateForInput(shift.endTime));
      }
    }
  }, [show, shift, setValue]);

  const onUpdate = (data: ShiftRequest) => {
    if (new Date(data.endTime!) <= new Date(data.startTime!)) {
      alert("End time must be after Start time!");
      return;
    }
    onSuccess('update', { ...data, shiftId: shift?.shiftID });
    reset();
  };
  
  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
        onSuccess('delete');
        reset();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose} title="Edit Shift">
      <form onSubmit={handleSubmit(onUpdate)}>
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
        <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
            <div>
                <button type="button" className="btn btn-secondary me-2" onClick={handleClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
        </div>
      </form>
    </Modal>
  );
}