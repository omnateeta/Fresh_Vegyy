import { Router } from 'express';
import { body } from 'express-validator';
import { deliveryController } from '../controllers/deliveryController';
import { authenticate } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/availability', authenticate(['delivery']), asyncHandler(deliveryController.toggleAvailability));

router.post(
  '/location',
  authenticate(['delivery']),
  [body('location.lat').isFloat(), body('location.lng').isFloat()],
  asyncHandler(deliveryController.updateLocation)
);

router.get('/performance', authenticate(['delivery']), asyncHandler(deliveryController.performance));

export default router;

