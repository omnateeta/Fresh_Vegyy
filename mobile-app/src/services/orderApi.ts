import { apiClient } from './apiClient';
import { Order } from '../types';
import { Socket } from 'socket.io-client';

export const orderApi = {
  async placeOrder(payload: {
    items: { productId: string; quantity: number }[];
    paymentMethod: 'upi' | 'card' | 'cod';
    deliveryAddress: string;
  }) {
    const { data } = await apiClient.post('/orders', payload);
    const order = data.data.order;
    return {
      ...order,
      id: String(order._id ?? order.id)
    };
  },

  subscribeToOrder(orderId: string, socket: Socket, onUpdate: (order: Order) => void) {
    socket.emit('joinOrder', orderId);
    socket.on('order:update', (payload: any) => {
      if (payload.orderId === orderId) {
        onUpdate({
          id: payload.orderId,
          status: payload.status,
          deliveryEta: payload.eta,
          liveLocation: undefined
        });
      }
    });
    socket.on('order:location', (payload: any) => {
      if (payload.orderId === orderId) {
        onUpdate({
          id: payload.orderId,
          status: payload.status ?? 'enroute',
          deliveryEta: payload.eta ?? '',
          liveLocation: payload.location
        });
      }
    });
  }
};

