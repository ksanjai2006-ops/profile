import api from './api';
import { Skill, ApiResponse } from '../types';

export const skillService = {
  getSkills: async (): Promise<ApiResponse<Skill[]>> => {
    const res = await api.get('/skills');
    return res.data;
  },
  createSkill: async (data: Partial<Skill>): Promise<ApiResponse<Skill>> => {
    const res = await api.post('/skills', data);
    return res.data;
  },
  updateSkill: async (id: string, data: Partial<Skill>): Promise<ApiResponse<Skill>> => {
    const res = await api.put(`/skills/${id}`, data);
    return res.data;
  },
  deleteSkill: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    const res = await api.delete(`/skills/${id}`);
    return res.data;
  }
};
