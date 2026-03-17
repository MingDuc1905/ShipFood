import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import {
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  getRestaurantStatus,
  updateRestaurantStatus,
} from '../controllers/restaurantController.js';

const router = Router();

// Public routes
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

// Protected routes
router.put('/:id', authMiddleware, requireRole(['Quán ăn']), updateRestaurant);
router.get('/:id/status', authMiddleware, getRestaurantStatus);
router.put('/:id/status', authMiddleware, requireRole(['Quán ăn']), updateRestaurantStatus);

export default router;
