import express from 'express';
import { getProductById } from '../controllers/UpdateController.js';

const router = express.Router();

// ROUTE UNTUK MENDAPATKAN PRODUK BERDASARKAN ID
router.get('/products/:id', getProductById);

export default router;