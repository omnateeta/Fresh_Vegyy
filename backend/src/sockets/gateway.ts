import { Server, Socket } from 'socket.io';
import http from 'http';
import { env } from '../config/env';
import { logger } from '../utils/logger';

class SocketGateway {
  private io?: Server;

  initialize(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: [env.clientOrigin, env.deliveryAppOrigin],
        credentials: true
      }
    });

    this.io.on('connection', (socket: Socket) => {
      logger.info('Socket client connected', { id: socket.id });

      socket.on('joinOrder', (orderId: string) => {
        socket.join(`order:${orderId}`);
      });

      socket.on('joinUser', (userId: string) => {
        socket.join(`user:${userId}`);
      });

      socket.on('joinDelivery', (partnerId: string) => {
        socket.join(`delivery:${partnerId}`);
      });
    });
  }

  emitOrderUpdate(userId: string, orderId: string, status: string, eta: Date) {
    this.io?.to(`user:${userId}`).emit('order:update', { orderId, status, eta });
  }

  emitOrderLocation(orderId: string, location?: { lat: number; lng: number; updatedAt: Date }) {
    this.io?.to(`order:${orderId}`).emit('order:location', { orderId, location });
  }

  emitDeliveryAssignment(partnerId: string, orderId: string) {
    this.io?.to(`delivery:${partnerId}`).emit('delivery:assigned', { orderId });
  }
}

export const socketGateway = new SocketGateway();


