import { Router } from 'express';
import { body } from 'express-validator';
import { authController } from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('phone').notEmpty(), body('password').isLength({ min: 6 })],
  asyncHandler(authController.register)
);

router.post(
  '/login',
  [body('emailOrPhone').notEmpty(), body('password').notEmpty()],
  asyncHandler(authController.login)
);

router.get('/me', authenticate(), asyncHandler(authController.profile));

export default router;

