import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (data: { name: string; email: string; password: string; role: string }) =>
    api.post('/auth/register', data),
};

// Shifts API
export const shiftsApi = {
  getAll: (startDate?: string, endDate?: string) =>
    api.get('/shifts', { params: { start_date: startDate, end_date: endDate } }),

  create: (data: { date: string; start_time: string; end_time: string }) =>
    api.post('/shifts', data),
};

// Shift Assignments API
export const shiftAssignmentsApi = {
  create: (data: { user_id: number; shift_id: number }) =>
    api.post('/shift-assignments', data),

  getMySchedule: (startDate?: string, endDate?: string) =>
    api.get('/my-schedule', { params: { start_date: startDate, end_date: endDate } }),
};

// Leave Requests API
export const leaveRequestsApi = {
  create: (data: { shift_assignment_id: number; reason?: string }) =>
    api.post('/leave-requests', data),

  getAll: (status?: string) =>
    api.get('/leave-requests', { params: { status } }),

  updateStatus: (id: number, status: 'approved' | 'rejected') =>
    api.patch(`/leave-requests/${id}/approve`, { status }),
};

// Users API
export const usersApi = {
  getAll: () => api.get('/users'),
};

export default api;