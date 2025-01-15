import express from "express";
import { 
    addCart,
    getCart,
    updateCart,
    deleteCart
} from "../controllers/CartController.js";

const router = express.Router();
// ROUTE UNTUK MENAMBAH DATA CARTS
router.post('/carts', addCart);

// ROUTE UNTUK MENGAMBIL DATA CARTS
router.get('/carts', getCart);

// ROUTE UNTUK MEMPERBARUI DATA CART
router.put('/carts/:id', updateCart)

// ROUTE UNTUK MENGHAPUS DATA CART
router.delete('/carts/:id', deleteCart)



export default router;