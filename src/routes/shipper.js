import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import {
  getShippers,
  getShipperById,
  updateShipperProfile,
  getShipperDeliveries,
  acceptDelivery,
} from '../controllers/shipperController.js';

const router = Router();

// Public routes
router.get('/', getShippers);
router.get('/:id', getShipperById);

// Protected routes
router.put('/profile', authMiddleware, requireRole(['Shipper']), updateShipperProfile);
router.get('/deliveries/list', authMiddleware, requireRole(['Shipper']), getShipperDeliveries);
router.post('/deliveries/accept', authMiddleware, requireRole(['Shipper']), acceptDelivery);

export default router;
