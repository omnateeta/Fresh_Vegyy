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
  
  // Update CORS configuration to allow requests from mobile app
  const allowedOrigins = [
    env.clientOrigin, 
    env.deliveryAppOrigin,
    'http://localhost:8081',  // Mobile app development server
    'http://localhost:8082'   // Alternative mobile app development server
  ];
  
  app.use(cors({ 
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true 
  }));
  
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