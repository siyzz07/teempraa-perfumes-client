import api from './config';

export const authApi = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  
  updateProfile: (data: Record<string, unknown>) => 
    api.put('/auth/profile', data),
};
