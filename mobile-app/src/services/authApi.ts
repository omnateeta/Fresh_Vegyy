import { apiClient } from './apiClient';

export const authApi = {
  async login(payload: { emailOrPhone: string; password: string }) {
    const { data } = await apiClient.post('/auth/login', payload);
    return data.data;
  },

  async register(payload: { name: string; phone: string; password: string; email?: string }) {
    const { data } = await apiClient.post('/auth/register', payload);
    return data.data;
  }
};


