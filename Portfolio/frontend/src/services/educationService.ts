import api from './api';
import { Education, ApiResponse } from '../types';

export const educationService = {
  getEducation: async (): Promise<ApiResponse<Education[]>> => {
    const res = await api.get('/education');
    return res.data;
  },
  createEducation: async (data: Partial<Education>): Promise<ApiResponse<Education>> => {
    const res = await api.post('/education', data);
    return res.data;
  },
  updateEducation: async (id: string, data: Partial<Education>): Promise<ApiResponse<Education>> => {
    const res = await api.put(`/education/${id}`, data);
    return res.data;
  },
  deleteEducation: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    const res = await api.delete(`/education/${id}`);
    return res.data;
  }
};
