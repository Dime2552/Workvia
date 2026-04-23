import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Modal from '../../../components/Modal';
import { UserService } from '../../../services/user.service';
import type { User } from '../../../types/user';
import type { ShiftRequest } from '../../../types/shift';
import DateTimePicker from '../../../components/DateTimePicker';

const toLocalISOString = (date: Date | null) => {
  if (!date) return null;
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 19);
  return localISOTime;
};

interface ShiftCreateModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: (data: ShiftRequest) => void;
}

export default function ShiftCreateModal({ show, onClose, onSuccess }: ShiftCreateModalProps) {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ShiftRequest>();
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
            <Controller
              control={control}
              name="startTime"
              rules={{ required: "Choose start date & time" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <DateTimePicker 
                    label="Start Time" 
                    selected={value ? new Date(value) : null} 
                    onChange={(date) => onChange(toLocalISOString(date))} 
                  />
                  {error && <div className="text-danger small">{error.message}</div>}
                </>
              )}
            />
             {errors.startTime && <div className="invalid-feedback">{errors.startTime.message}</div>}
          </div>

          <div className="mb-3">
            <Controller
              control={control}
              name="endTime"
              rules={{ required: "Choose end date & time" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <DateTimePicker 
                    label="End Time" 
                    selected={value ? new Date(value) : null} 
                    onChange={(date) => onChange(toLocalISOString(date))} 
                  />
                  {error && <div className="text-danger small">{error.message}</div>}
                </>
              )}
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