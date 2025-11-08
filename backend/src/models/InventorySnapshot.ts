import { Schema, model, Document, Types } from 'mongoose';

export interface IInventorySnapshot extends Document {
  product: Types.ObjectId;
  quantity: number;
  reserved: number;
  timestamp: Date;
  source: string;
}

const inventorySnapshotSchema = new Schema<IInventorySnapshot>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    reserved: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
    source: { type: String, enum: ['warehouse', 'partner', 'manual'], default: 'warehouse' }
  },
  { timestamps: true }
);

export const InventorySnapshot = model<IInventorySnapshot>('InventorySnapshot', inventorySnapshotSchema);


