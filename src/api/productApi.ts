import api from './config';

export const productApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/products', { params }),
  
  getById: (id: string) => api.get(`/products/${id}`),
  
  create: (data: Record<string, unknown>) => api.post('/products', data),
  
  update: (id: string, data: Record<string, unknown>) => api.put(`/products/${id}`, data),
  
  delete: (id: string) => api.delete(`/products/${id}`),
};
