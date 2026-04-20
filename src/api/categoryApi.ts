import api from './config';

export const scentTypeApi = {
  getAll: () => api.get('/categories'),
  
  create: (data: { name: string; icon?: string }) => api.post('/categories', data),
  
  update: (id: string, data: { name: string; icon?: string }) => api.put(`/categories/${id}`, data),
  
  delete: (id: string) => api.delete(`/categories/${id}`),
};
