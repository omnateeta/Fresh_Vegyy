import { Request, Response, RequestHandler } from 'express';
import { orderService } from '../services/orderService';
import { sendSuccess } from '../utils/httpResponses';

const list: RequestHandler = async (req: Request, res: Response) => {
  const orders = await orderService.listOrders({
    userId: req.user?.role === 'user' ? req.user.id : undefined,
    deliveryPartnerId: req.user?.role === 'delivery' ? req.user.id : undefined,
    assigned: req.query.assigned === 'true'
  });
  sendSuccess(res, { orders });
};

const create: RequestHandler = async (req: Request, res: Response) => {
    const order = await orderService.createOrder({
      userId: req.user!.id,
      items: req.body.items,
      paymentMethod: req.body.paymentMethod,
      deliveryAddress: req.body.deliveryAddress
    });
    sendSuccess(res, { order }, 'Order placed');
  };

const assign: RequestHandler = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { partnerId } = req.body;
    const order = await orderService.assignDelivery(orderId, partnerId);
    sendSuccess(res, { order }, 'Delivery assigned');
  };

const updateStatus: RequestHandler = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await orderService.updateStatus(orderId, req.body.status, req.body.note);
    sendSuccess(res, { order }, 'Order status updated');
  };

const updateLocation: RequestHandler = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await orderService.updateLocation(orderId, req.body.location);
    sendSuccess(res, { order }, 'Order location updated');
  };

export const orderController = { list, create, assign, updateStatus, updateLocation };

