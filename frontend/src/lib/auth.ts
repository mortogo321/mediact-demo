export interface User {
  id: number;
  name: string;
  email: string;
  role: 'nurse' | 'head_nurse';
}

export const saveAuth = (token: string, user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getAuth = (): { token: string | null; user: User | null } => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
  }
  return { token: null, user: null };
};

export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
};

export const isAuthenticated = (): boolean => {
  const { token } = getAuth();
  return !!token;
};

export const isHeadNurse = (): boolean => {
  const { user } = getAuth();
  return user?.role === 'head_nurse';
};

export const isNurse = (): boolean => {
  const { user } = getAuth();
  return user?.role === 'nurse';
};