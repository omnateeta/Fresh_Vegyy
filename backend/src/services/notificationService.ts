import { logger } from '../utils/logger';

export type NotificationChannel = 'push' | 'sms' | 'email' | 'inapp';

export const notificationService = {
  async send(channel: NotificationChannel, target: string, payload: { title: string; body: string; data?: Record<string, unknown> }) {
    // Integrations with FCM/SMS/email providers would be added here.
    logger.info(`Dispatching ${channel} notification`, { target, payload });
    return { delivered: true };
  }
};


