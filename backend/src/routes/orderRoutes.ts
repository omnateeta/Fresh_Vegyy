import { Router } from 'express';
import { body } from 'express-validator';
import { orderController } from '../controllers/orderController';
import { authenticate } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post(
  '/',
  authenticate(['user']),
  [body('items').isArray({ min: 1 }), body('paymentMethod').isIn(['upi', 'card', 'cod'])],
  asyncHandler(orderController.create)
);

router.get('/', authenticate(['user', 'admin', 'delivery']), asyncHandler(orderController.list));

router.post('/:orderId/assign', authenticate(['admin']), asyncHandler(orderController.assign));

router.post(
  '/:orderId/status',
  authenticate(['admin', 'delivery']),
  asyncHandler(orderController.updateStatus)
);

router.post(
  '/:orderId/location',
  authenticate(['delivery']),
  asyncHandler(orderController.updateLocation)
);

export default router;

