import api from './api';
import { Certification, ApiResponse } from '../types';

export const certService = {
  getCertifications: async (): Promise<ApiResponse<Certification[]>> => {
    const res = await api.get('/certifications');
    return res.data;
  },
  createCertification: async (data: Partial<Certification>): Promise<ApiResponse<Certification>> => {
    const res = await api.post('/certifications', data);
    return res.data;
  },
  updateCertification: async (id: string, data: Partial<Certification>): Promise<ApiResponse<Certification>> => {
    const res = await api.put(`/certifications/${id}`, data);
    return res.data;
  },
  deleteCertification: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    const res = await api.delete(`/certifications/${id}`);
    return res.data;
  }
};
