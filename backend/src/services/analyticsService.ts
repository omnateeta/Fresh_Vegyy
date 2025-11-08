import { Order } from '../models/Order';
import { Product } from '../models/Product';

export const analyticsService = {
  async summary() {
    const [orderStats, topProducts] = await Promise.all([
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$total' },
            totalOrders: { $sum: 1 }
          }
        }
      ]),
      Product.find().sort({ 'rating.count': -1 }).limit(5).lean()
    ]);

    const summaryData = orderStats[0] || { totalRevenue: 0, totalOrders: 0 };

    return {
      revenue: summaryData.totalRevenue,
      orders: summaryData.totalOrders,
      topProducts
    };
  }
};


