import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { env } from '../config/env';

export const authenticate = (roles: Array<'user' | 'admin' | 'delivery'> = ['user', 'admin', 'delivery']) =>
  (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
    }
    try {
      const token = header.replace('Bearer ', '');
      const decoded = jwt.verify(token, env.jwtSecret) as Express.UserPayload;
      if (!roles.includes(decoded.role)) {
        return res.status(StatusCodes.FORBIDDEN).json({ success: false, message: 'Forbidden' });
      }
      req.user = decoded;
      return next();
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, message: 'Invalid token', error: (error as Error).message });
    }
  };


