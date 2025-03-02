import path from 'path';
import express from "express";
import { 
    getProducts, 
    getProductById,
    getProductByCategory,
    addProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js"
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');  // folder tempat menyimpan file
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // nama file unik
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("File harus berupa gambar!"), false);
    }
};


const upload = multer({ storage, fileFilter });

const router = express.Router();

router.get("/products", getProducts); // Mendapatkan semua produk
router.get("/products/:id", getProductById); // Mendapatkan produk berdasarkan ID
router.get("/products/category/:code", getProductByCategory); // Mendapatkan produk berdasarkan kategori
router.post('/products', upload.single("image"), addProduct);
router.patch("/products/:id", upload.single("image"), updateProduct);
// router.post('/products', addProduct);
// router.patch("/products/:id", (req, res, next) => {
//     upload.single("image")(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({ message: err.message });
//         } else if (err) {
//             return res.status(500).json({ message: "Unexpected error occurred!" });
//         }
//         next();
//     });
// }, updateProduct);

router.delete("/products/:id", deleteProduct); // Menghapus produk



export default router;

