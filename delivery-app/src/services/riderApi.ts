import { apiClient } from './apiClient';

export const riderApi = {
  async login(payload: { phone: string; otp: string }) {
    const { data } = await apiClient.post('/auth/login', {
      emailOrPhone: payload.phone,
      password: payload.otp
    });
    return data.data;
  },

  async toggleAvailability(isOnline: boolean) {
    await apiClient.post('/delivery/availability', { isOnline });
  },

  async updateLocation(location: { lat: number; lng: number }) {
    await apiClient.post('/delivery/location', { location });
  }
};


