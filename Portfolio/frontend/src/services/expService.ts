import api from './api';
import { Experience, ApiResponse } from '../types';

export const expService = {
  getExperience: async (): Promise<ApiResponse<Experience[]>> => {
    const res = await api.get('/experience');
    return res.data;
  },
  createExperience: async (data: Partial<Experience>): Promise<ApiResponse<Experience>> => {
    const res = await api.post('/experience', data);
    return res.data;
  },
  updateExperience: async (id: string, data: Partial<Experience>): Promise<ApiResponse<Experience>> => {
    const res = await api.put(`/experience/${id}`, data);
    return res.data;
  },
  deleteExperience: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    const res = await api.delete(`/experience/${id}`);
    return res.data;
  }
};
