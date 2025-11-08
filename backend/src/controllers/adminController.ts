import { Request, Response, RequestHandler } from 'express';
import { analyticsService } from '../services/analyticsService';
import { sendSuccess } from '../utils/httpResponses';

const dashboard: RequestHandler = async (_req: Request, res: Response) => {
  const summary = await analyticsService.summary();
  sendSuccess(res, summary);
};

export const adminController = { dashboard };

