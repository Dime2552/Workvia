export interface Shift {
  shiftID: string;
  employeeID: string;
  employeeName: string;
  startTime: string;
  endTime: string;
}

export interface ShiftRequest {
  shiftId?: string | null;
  employeeId: string | null;
  startTime: string | null;
  endTime: string | null;
}