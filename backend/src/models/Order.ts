import { Schema, model, Document, Types } from 'mongoose';

export type OrderStatus = 'pending' | 'preparing' | 'enroute' | 'delivered' | 'cancelled';

export interface IOrderItem {
  product: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  deliveryPartner?: Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: 'upi' | 'card' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
  deliveryEta: Date;
  deliveryAddress: string;
  liveLocation?: {
    lat: number;
    lng: number;
    updatedAt: Date;
  };
  events: {
    status: OrderStatus;
    timestamp: Date;
    note?: string;
  }[];
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deliveryPartner: { type: Schema.Types.ObjectId, ref: 'DeliveryPartner' },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'preparing', 'enroute', 'delivered', 'cancelled'],
      default: 'pending'
    },
    paymentMethod: { type: String, enum: ['upi', 'card', 'cod'], required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    deliveryEta: { type: Date, required: true },
    deliveryAddress: { type: String, required: true },
    liveLocation: {
      lat: Number,
      lng: Number,
      updatedAt: Date
    },
    events: [
      {
        status: {
          type: String,
          enum: ['pending', 'preparing', 'enroute', 'delivered', 'cancelled'],
          required: true
        },
        timestamp: { type: Date, default: Date.now },
        note: { type: String }
      }
    ]
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', orderSchema);


