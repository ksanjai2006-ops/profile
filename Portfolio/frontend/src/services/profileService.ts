import api from './api';
import { Profile, ApiResponse } from '../types';

export const profileService = {
  getProfile: async (): Promise<ApiResponse<Profile>> => {
    const res = await api.get('/profile');
    return res.data;
  },
  updateProfile: async (data: Partial<Profile>): Promise<ApiResponse<Profile>> => {
    const res = await api.put('/profile', data);
    return res.data;
  }
};
