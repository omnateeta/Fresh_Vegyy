import { Schema, model, Document } from 'mongoose';

export interface IDeliveryPartner extends Document {
  name: string;
  phone: string;
  email?: string;
  isOnline: boolean;
  currentOrder?: string;
  stats: {
    completed: number;
    cancelled: number;
    rating: number;
  };
  location?: {
    lat: number;
    lng: number;
    updatedAt: Date;
  };
}

const deliveryPartnerSchema = new Schema<IDeliveryPartner>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    isOnline: { type: Boolean, default: false },
    currentOrder: { type: String },
    stats: {
      completed: { type: Number, default: 0 },
      cancelled: { type: Number, default: 0 },
      rating: { type: Number, default: 5 }
    },
    location: {
      lat: Number,
      lng: Number,
      updatedAt: Date
    }
  },
  { timestamps: true }
);

export const DeliveryPartner = model<IDeliveryPartner>('DeliveryPartner', deliveryPartnerSchema);


