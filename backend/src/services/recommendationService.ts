import { Product } from '../models/Product';
import { Order } from '../models/Order';

export const recommendationService = {
  async personalised(userId: string, limit = 6) {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).limit(10).lean();
    const categoryCount: Record<string, number> = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        categoryCount[item.name] = (categoryCount[item.name] || 0) + item.quantity;
      });
    });

    if (!orders.length) {
      return Product.find({ seasonal: true }).limit(limit).lean();
    }

    const topNames = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

    return Product.find({ name: { $in: topNames } }).limit(limit).lean();
  },

  async seasonal(limit = 8) {
    return Product.find({ seasonal: true }).sort({ freshnessScore: -1 }).limit(limit).lean();
  }
};


