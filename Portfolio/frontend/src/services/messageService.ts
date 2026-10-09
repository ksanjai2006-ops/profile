import api from './api';
import { Message, ApiResponse } from '../types';

export const messageService = {
  sendMessage: async (data: { name: string; email: string; subject: string; message: string }): Promise<ApiResponse<Message>> => {
    const res = await api.post('/messages', data);
    return res.data;
  },
  getMessages: async (): Promise<ApiResponse<Message[]>> => {
    const res = await api.get('/messages');
    return res.data;
  },
  markRead: async (id: string): Promise<ApiResponse<Message>> => {
    const res = await api.put(`/messages/${id}/read`);
    return res.data;
  },
  deleteMessage: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    const res = await api.delete(`/messages/${id}`);
    return res.data;
  }
};
