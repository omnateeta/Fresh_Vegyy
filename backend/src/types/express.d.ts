declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      role: 'user' | 'admin' | 'delivery';
    }

    interface Request {
      user?: UserPayload;
      requestId?: string;
    }
  }
}

export {}

