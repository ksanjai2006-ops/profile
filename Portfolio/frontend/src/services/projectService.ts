import api from './api';
import { Project, ApiResponse } from '../types';

export const projectService = {
  getProjects: async (params?: { category?: string; search?: string; featured?: boolean }): Promise<ApiResponse<Project[]>> => {
    const res = await api.get('/projects', { params });
    return res.data;
  },
  getProjectBySlug: async (slug: string): Promise<ApiResponse<Project>> => {
    const res = await api.get(`/projects/${slug}`);
    return res.data;
  },
  createProject: async (data: Partial<Project>): Promise<ApiResponse<Project>> => {
    const res = await api.post('/projects', data);
    return res.data;
  },
  updateProject: async (id: string, data: Partial<Project>): Promise<ApiResponse<Project>> => {
    const res = await api.put(`/projects/${id}`, data);
    return res.data;
  },
  deleteProject: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    const res = await api.delete(`/projects/${id}`);
    return res.data;
  }
};
