import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export const sendSuccess = <T>(res: Response, data: T, message?: string, status = StatusCodes.OK) => {
  const payload: ApiResponse<T> = { success: true, data, message };
  res.status(status).json(payload);
};

export const sendError = (res: Response, message: string, status = StatusCodes.BAD_REQUEST) => {
  const payload: ApiResponse<null> = { success: false, message };
  res.status(status).json(payload);
};


