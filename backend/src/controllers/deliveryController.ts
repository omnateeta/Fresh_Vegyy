import { Request, Response, RequestHandler } from 'express';
import { deliveryService } from '../services/deliveryService';
import { sendSuccess } from '../utils/httpResponses';

const toggleAvailability: RequestHandler = async (req: Request, res: Response) => {
  const partner = await deliveryService.toggleAvailability(req.user!.id, req.body.isOnline);
  sendSuccess(res, { partner });
};

const updateLocation: RequestHandler = async (req: Request, res: Response) => {
  const partner = await deliveryService.updateLocation(req.user!.id, req.body.location);
  sendSuccess(res, { partner });
};

const performance: RequestHandler = async (req: Request, res: Response) => {
  const stats = await deliveryService.performanceSummary(req.user!.id);
  sendSuccess(res, { stats });
};

export const deliveryController = { toggleAvailability, updateLocation, performance };

