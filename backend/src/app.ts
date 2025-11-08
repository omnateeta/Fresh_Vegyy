import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import adminRoutes from './routes/adminRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
import notificationRoutes from './routes/notificationRoutes';
import { errorHandler } from './middlewares/errorHandler';

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(helmet());
  app.use(cors({ origin: [env.clientOrigin, env.deliveryAppOrigin], credentials: true }));
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => {
    res.json({ success: true, status: 'ok' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/delivery', deliveryRoutes);
  app.use('/api/notifications', notificationRoutes);

  app.use(errorHandler);
  return app;
};


