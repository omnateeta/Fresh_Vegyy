import dotenv from 'dotenv';

dotenv.config({ path: process.env.ENV_PATH || undefined });

const requiredEnv = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
});

export const env = {
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  clientOrigin: process.env.CLIENT_ORIGIN || '*',
  deliveryAppOrigin: process.env.DELIVERY_APP_ORIGIN || '*',
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || ''
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || ''
  },
  fcmServerKey: process.env.FCM_SERVER_KEY || ''
};


