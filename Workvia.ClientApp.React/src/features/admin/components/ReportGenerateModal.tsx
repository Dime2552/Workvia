import { Controller, useForm } from 'react-hook-form';
import Modal from '../../../components/Modal';
import DatePickerOnly from '../../../components/DatePickerOnly';
import { toast } from 'react-toastify';

interface ReportGenerateModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: (start: Date, end: Date) => void;
}

interface ReportForm {
  startDate: string;
  endDate: string;
}

export default function ReportGenerateModal({ show, onClose, onSuccess }: ReportGenerateModalProps) {
  const { handleSubmit, control, reset } = useForm<ReportForm>();

  const onSubmit = (data: ReportForm) => {
    const start = new Date(data.startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(data.endDate);
    end.setHours(23, 59, 59, 999);

    if (end <= start) {
      toast.error("End date must be after Start date!");
      return;
    }

    onSuccess(start, end);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose} title="Generate Excel Report">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <div className="alert alert-info">
            Select a date range (days) to generate a report containing all shifts and employee summaries.
          </div>

          <div className="mb-3">
            <Controller
              control={control}
              name="startDate"
              rules={{ required: "Start date is required" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <DatePickerOnly 
                    label="Start Date" 
                    selected={value ? new Date(value) : null} 
                    onChange={(date) => onChange(date?.toISOString())} 
                  />
                  {error && <div className="text-danger small">{error.message}</div>}
                </>
              )}
            />
          </div>

          <div className="mb-3">
            <Controller
              control={control}
              name="endDate"
              rules={{ required: "End date is required" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <DatePickerOnly 
                    label="End Date" 
                    selected={value ? new Date(value) : null} 
                    onChange={(date) => onChange(date?.toISOString())} 
                  />
                  {error && <div className="text-danger small">{error.message}</div>}
                </>
              )}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
          <button type="submit" className="btn btn-success">
            <i className="bi bi-file-earmark-excel me-2"></i>Download
          </button>
        </div>
      </form>
    </Modal>
  );
}