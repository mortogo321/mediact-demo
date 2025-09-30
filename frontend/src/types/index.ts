export interface User {
  id: number;
  name: string;
  email: string;
  role: 'nurse' | 'head_nurse';
}

export interface Shift {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
}

export interface ShiftAssignment {
  id: number;
  user_id: number;
  shift_id: number;
  shift: Shift;
  user?: User;
  leave_requests?: LeaveRequest[];
}

export interface LeaveRequest {
  id: number;
  shift_assignment_id: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: number;
  created_at: string;
  shift_assignment?: ShiftAssignment;
}