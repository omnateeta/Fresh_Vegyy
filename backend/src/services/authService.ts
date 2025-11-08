import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { User, IUser, UserRole } from '../models/User';
import { env } from '../config/env';
import { HttpError } from '../utils/httpError';

const tokenExpiry = '7d';

const sanitizeUser = (user: IUser) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  addresses: user.addresses,
  preferences: user.preferences
});

export const authService = {
  async register(params: {
    name: string;
    email?: string;
    phone: string;
    password: string;
    role?: UserRole;
  }) {
    const existing = await User.findOne({ $or: [{ email: params.email }, { phone: params.phone }] });
    if (existing) {
      throw new HttpError(StatusCodes.CONFLICT, 'User already exists');
    }
    const user = await User.create({
      name: params.name,
      email: params.email,
      phone: params.phone,
      password: params.password,
      role: params.role ?? 'user'
    });
    return this.generateAuthResponse(user);
  },

  async login(params: { emailOrPhone: string; password: string }) {
    const user = await User.findOne({
      $or: [{ email: params.emailOrPhone }, { phone: params.emailOrPhone }]
    });
    if (!user) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }
    const passwordOk = await user.comparePassword(params.password);
    if (!passwordOk) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }
    return this.generateAuthResponse(user);
  },

  generateAuthResponse(user: IUser) {
    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, env.jwtSecret, { expiresIn: tokenExpiry });
    return {
      token,
      user: sanitizeUser(user)
    };
  }
};


