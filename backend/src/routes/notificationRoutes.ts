import { Router } from 'express';
import { notificationController } from '../controllers/notificationController';
import { authenticate } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/', authenticate(['admin']), asyncHandler(notificationController.send));

export default router;

