import express from "express";
import { 
    getProducts, 
    getProductByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
} from "../controllers/ProductController.js"

const router = express.Router();
// ROUTE UNTUK MENAMBAH PRODUK
router.post('/products', addProduct);

// ROUTE UNTUK MENDAPATKAN PRODUK
router.get('/products', getProducts);

// ROUTE UNTUK MENDAPATKAN PRODUK SESUAI DENGAN ID KATEGORI
router.get('/products/:categoryId', getProductByCategory); 

// ROUTE UNTUK MENDAPATKAN PRODUK BERDASARKAN ID
// router.get('/products/:id', getProductById);

//
router.get('/products', getProductById);

// ROUTE UNTUK UPDATE PRODUK
router.patch('/products/:id', updateProduct);

// ROUTE UNTUK MENGHAPUS PRODUK
router.delete('/products/:id', deleteProduct);


export default router;

