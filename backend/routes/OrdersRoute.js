import express from 'express';
import { getOrders, saveOrder } from '../controllers/OrdersController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router()

// MENYIMPAN ORDER DETAIL KE DATABASE
router.post('/ordereds', authenticateToken, saveOrder);

// MENGAMBIL DATA ORDERS DARI DATABASE
router.get('/ordereds', getOrders)

export default router;