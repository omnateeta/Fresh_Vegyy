import { Router } from 'express';
import { adminController } from '../controllers/adminController';
import { authenticate } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/dashboard', authenticate(['admin']), asyncHandler(adminController.dashboard));

export default router;

