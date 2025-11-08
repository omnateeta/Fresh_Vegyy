import { apiClient } from './apiClient';
import { DeliveryOrder } from '../types';

export const orderApi = {
  async listForRider(): Promise<DeliveryOrder[]> {
    const { data } = await apiClient.get('/orders?assigned=true');
    return (data.data?.orders || []).map((item: any) => ({
      id: item._id,
      address: item.deliveryAddress,
      status: item.status,
      eta: item.deliveryEta,
      lat: item.liveLocation?.lat,
      lng: item.liveLocation?.lng
    }));
  },

  async updateStatus(orderId: string, status: string) {
    await apiClient.post(`/orders/${orderId}/status`, { status });
  },

  async updateLocation(orderId: string, location: { lat: number; lng: number }) {
    await apiClient.post(`/orders/${orderId}/location`, { location });
  }
};


