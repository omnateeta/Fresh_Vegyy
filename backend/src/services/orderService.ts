import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { Order, OrderStatus } from '../models/Order';
import { Product } from '../models/Product';
import { DeliveryPartner } from '../models/DeliveryPartner';
import { HttpError } from '../utils/httpError';
import { socketGateway } from '../sockets/gateway';

export const orderService = {
  async listOrders(filter: { userId?: string; deliveryPartnerId?: string; assigned?: boolean }) {
    const query: Record<string, unknown> = {};
    if (filter.userId) {
      query.user = filter.userId;
    }
    if (filter.deliveryPartnerId) {
      query.deliveryPartner = filter.deliveryPartnerId;
    }
    if (filter.assigned === true) {
      query.deliveryPartner = { $exists: true, $ne: null };
    }
    return Order.find(query).sort({ createdAt: -1 }).lean();
  },

  async createOrder(params: {
    userId: string;
    items: { productId: string; quantity: number }[];
    paymentMethod: 'upi' | 'card' | 'cod';
    deliveryAddress: string;
  }) {
    const productIds = params.items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'One or more products unavailable');
    }

    const orderItems = params.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      if (product.stock < item.quantity) {
        throw new HttpError(StatusCodes.BAD_REQUEST, `${product.name} is out of stock`);
      }
      product.stock -= item.quantity;
      return {
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price
      };
    });

    await Promise.all(products.map((p) => p.save()));

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const eta = new Date(Date.now() + 10 * 60 * 1000);

    const order = await Order.create({
      user: new Types.ObjectId(params.userId),
      items: orderItems,
      total,
      status: 'pending',
      paymentMethod: params.paymentMethod,
      paymentStatus: params.paymentMethod === 'cod' ? 'pending' : 'paid',
      deliveryEta: eta,
      deliveryAddress: params.deliveryAddress,
      events: [{ status: 'pending', timestamp: new Date(), note: 'Order received' }]
    });

    socketGateway.emitOrderUpdate(order.user.toString(), order.id, order.status, order.deliveryEta);

    return order;
  },

  async assignDelivery(orderId: string, partnerId: string) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Order not found');
    }
    const partner = await DeliveryPartner.findById(partnerId);
    if (!partner) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Delivery partner not found');
    }

    order.deliveryPartner = partner._id as Types.ObjectId;
    order.status = 'preparing';
    order.events.push({ status: 'preparing', timestamp: new Date(), note: 'Assigned to rider' });
    await order.save();

    partner.currentOrder = order.id;
    partner.isOnline = true;
    await partner.save();

    socketGateway.emitOrderUpdate(order.user.toString(), order.id, order.status, order.deliveryEta);
    socketGateway.emitDeliveryAssignment(partner.id, order.id);

    return order;
  },

  async updateStatus(orderId: string, status: OrderStatus, note?: string) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Order not found');
    }
    order.status = status;
    order.events.push({ status, timestamp: new Date(), note });
    await order.save();
    socketGateway.emitOrderUpdate(order.user.toString(), order.id, order.status, order.deliveryEta);
    return order;
  },

  async updateLocation(orderId: string, location: { lat: number; lng: number }) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Order not found');
    }
    order.liveLocation = { ...location, updatedAt: new Date() };
    await order.save();
    socketGateway.emitOrderLocation(order.id, order.liveLocation);
    return order;
  }
};

