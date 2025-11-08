import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../utils/logger';
import { HttpError } from '../utils/httpError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err instanceof HttpError ? err.status : StatusCodes.INTERNAL_SERVER_ERROR;
  logger.error('Request error', { message: err.message, stack: err.stack, path: req.path });
  res.status(status).json({ success: false, message: err.message });
};


