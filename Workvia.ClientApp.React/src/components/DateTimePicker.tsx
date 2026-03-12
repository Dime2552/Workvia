import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
}

export default function DateTimePicker({ selected, onChange, label }: Props) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="d-block">
        <DatePicker
          selected={selected}
          onChange={onChange}
          showTimeSelect
          dateFormat="dd.MM.yyyy HH:mm"
          timeFormat="HH:mm"
          className="form-control"
          wrapperClassName="w-100"
          placeholderText="Choose date and time"
        />
      </div>
    </div>
  );
}