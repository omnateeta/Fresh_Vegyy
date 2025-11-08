import { Request, Response, RequestHandler } from 'express';
import { notificationService } from '../services/notificationService';
import { sendSuccess } from '../utils/httpResponses';

const send: RequestHandler = async (req: Request, res: Response) => {
  const result = await notificationService.send(req.body.channel, req.body.target, {
    title: req.body.title,
    body: req.body.body,
    data: req.body.data
  });
  sendSuccess(res, result, 'Notification queued');
};

export const notificationController = { send };

