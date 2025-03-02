import express from 'express';
import {
    getCart, 
    addCart,
    deleteCart 
} from '../controllers/CartController.js';

const router = express.Router();

router.get('/carts', getCart);
router.post('/carts', addCart);
router.delete('/carts', deleteCart);

export default router;
