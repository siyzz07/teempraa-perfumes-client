import api from './config';

export const uploadApi = {
  uploadImage: (formData: FormData) => 
    api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
