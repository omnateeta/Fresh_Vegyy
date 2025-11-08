import { Request, Response, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/authService';
import { sendSuccess } from '../utils/httpResponses';

const register: RequestHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, errors: errors.array() });
    }
    const { name, email, phone, password } = req.body;
    const result = await authService.register({ name, email, phone, password });
    sendSuccess(res, result, 'Registration successful', StatusCodes.CREATED);
  };

const login: RequestHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, errors: errors.array() });
    }
    const { emailOrPhone, password } = req.body;
    const result = await authService.login({ emailOrPhone, password });
    sendSuccess(res, result, 'Login successful');
  };

const profile: RequestHandler = (req: Request, res: Response) => {
  sendSuccess(res, { user: req.user });
};

export const authController = { register, login, profile };

