import { Schema, model, Document } from 'mongoose';

export interface IOffer extends Document {
  code: string;
  description: string;
  discountPercentage?: number;
  flatDiscountAmount?: number;
  minimumOrderValue?: number;
  validFrom: Date;
  validTo: Date;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
}

const offerSchema = new Schema<IOffer>(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    discountPercentage: { type: Number },
    flatDiscountAmount: { type: Number },
    minimumOrderValue: { type: Number },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    usageLimit: { type: Number },
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Offer = model<IOffer>('Offer', offerSchema);


