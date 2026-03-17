import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import {
  createOrder,
  getOrderById,
  getOrdersByCustomer,
  getOrdersByRestaurant,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController.js';

const router = Router();

// Customer routes
router.post('/', authMiddleware, requireRole(['Khách hàng']), createOrder);
router.get('/customer/list', authMiddleware, requireRole(['Khách hàng']), getOrdersByCustomer);
router.get('/:id', authMiddleware, getOrderById);
router.put('/:id/cancel', authMiddleware, cancelOrder);

// Restaurant routes
router.get('/restaurant/list', authMiddleware, requireRole(['Quán ăn']), getOrdersByRestaurant);
router.put('/:id/status', authMiddleware, requireRole(['Quán ăn']), updateOrderStatus);

export default router;
