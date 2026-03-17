import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import {
  getDashboard,
  getUsers,
  approveRestaurant,
  lockUser,
} from '../controllers/adminController.js';

const router = Router();

// Admin only routes
router.get('/dashboard', authMiddleware, requireRole(['Admin']), getDashboard);
router.get('/users', authMiddleware, requireRole(['Admin']), getUsers);
router.post('/restaurants/:restaurantId/approve', authMiddleware, requireRole(['Admin']), approveRestaurant);
router.post('/users/:userId/lock', authMiddleware, requireRole(['Admin']), lockUser);

export default router;
