import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import {
  createMenu,
  getMenusByRestaurant,
  getMenuById,
  updateMenu,
  deleteMenu,
  getMenusByCategory,
  searchMenus,
} from '../controllers/menuController.js';

const router = Router();

// Public routes
router.get('/', searchMenus);
router.get('/category/:categoryId', getMenusByCategory);
router.get('/restaurant/:restaurantId', getMenusByRestaurant);
router.get('/:id', getMenuById);

// Protected routes (Restaurant only)
router.post('/', authMiddleware, requireRole(['Quán ăn']), createMenu);
router.put('/:id', authMiddleware, requireRole(['Quán ăn']), updateMenu);
router.delete('/:id', authMiddleware, requireRole(['Quán ăn']), deleteMenu);

export default router;
