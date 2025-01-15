import express from 'express';
import { addCategory, getCategories, getCategoryById } from '../controllers/CategoryController.js';

const router = express.Router();
// MENAMBAH KATEGORI
router.post('/categories', addCategory);

// MENGAMBIL DATA KATEGORI UNTUK REQUEST DARI FRONTEND
router.get('/categories', getCategories);

// MENGAMBIL DATA KATEGORI SESUAI ID
router.get('/categories/:id', getCategoryById)

export default router;