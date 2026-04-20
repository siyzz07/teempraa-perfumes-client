import api from './config';

export const shopApi = {
  getSettings: () => api.get('/shop'),
  
  updateSettings: (data: Record<string, unknown>) => api.put('/shop', data),
};
