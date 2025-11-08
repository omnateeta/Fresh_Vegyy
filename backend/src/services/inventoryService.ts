import { Types } from 'mongoose';
import { Product } from '../models/Product';
import { InventorySnapshot } from '../models/InventorySnapshot';
import { HttpError } from '../utils/httpError';
import { StatusCodes } from 'http-status-codes';

export const inventoryService = {
  async listProducts(filters: { category?: string; seasonal?: boolean }) {
    const query: Record<string, unknown> = {};
    if (filters.category) {
      query.category = filters.category;
    }
    if (typeof filters.seasonal === 'boolean') {
      query.seasonal = filters.seasonal;
    }
    return Product.find(query).lean();
  },

  async createProduct(payload: {
    name: string;
    slug: string;
    description?: string;
    category: string;
    price: number;
    unit?: string;
    stock?: number;
    freshnessScore?: number;
    imageUrl?: string;
    seasonal?: boolean;
    tags?: string[];
  }) {
    return Product.create(payload);
  },

  async updateProduct(id: string, payload: Partial<{ price: number; stock: number; freshnessScore: number; description: string; imageUrl: string; tags: string[]; seasonal: boolean }>) {
    const updated = await Product.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
    }
    return updated;
  },

  async adjustStock(productId: Types.ObjectId | string, delta: number, reservedDelta = 0) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
    }
    const newStock = product.stock + delta;
    if (newStock < 0) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Insufficient stock');
    }
    product.stock = newStock;
    if (reservedDelta) {
      product.markModified('stock');
    }
    await product.save();
    await InventorySnapshot.create({
      product: product._id,
      quantity: product.stock,
      reserved: Math.max(0, reservedDelta),
      source: 'manual'
    });
    return product;
  }
};


