import { apiClient } from './apiClient';
import { Product } from '../types';

export const productApi = {
  async list(): Promise<Product[]> {
    const { data } = await apiClient.get('/products');
    return data.data.products.map((item: any) => ({
      id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      unit: item.unit,
      stock: item.stock,
      freshnessScore: item.freshnessScore,
      imageUrl: item.imageUrl,
      seasonal: item.seasonal,
      tags: item.tags
    }));
  }
};


