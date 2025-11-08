import { Router } from 'express';
import { body } from 'express-validator';
import { productController } from '../controllers/productController';
import { authenticate } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(productController.list));

router.post(
  '/',
  authenticate(['admin']),
  [body('name').notEmpty(), body('price').isNumeric(), body('category').notEmpty(), body('slug').notEmpty()],
  asyncHandler(productController.create)
);

router.patch('/:id', authenticate(['admin']), asyncHandler(productController.update));

export default router;

