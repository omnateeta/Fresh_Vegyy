import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  category: 'leafy' | 'root' | 'fruit' | 'herb' | 'exotic';
  price: number;
  unit: string;
  stock: number;
  freshnessScore: number;
  imageUrl?: string;
  seasonal?: boolean;
  tags: string[];
  rating: {
    average: number;
    count: number;
  };
  sourceFarm?: string;
  leadTimeMinutes: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    category: {
      type: String,
      enum: ['leafy', 'root', 'fruit', 'herb', 'exotic'],
      required: true
    },
    price: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    stock: { type: Number, default: 0 },
    freshnessScore: { type: Number, default: 5 },
    imageUrl: { type: String },
    seasonal: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    },
    sourceFarm: { type: String },
    leadTimeMinutes: { type: Number, default: 10 }
  },
  { timestamps: true }
);

export const Product = model<IProduct>('Product', productSchema);


