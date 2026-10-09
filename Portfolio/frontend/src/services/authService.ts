import api from './api';
import { ApiResponse } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; email: string }>> => {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  }
};
