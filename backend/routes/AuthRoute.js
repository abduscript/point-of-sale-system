import express from 'express';
import {
    signUp,
    loginUser,
    forgotPassword,
    getUserData
} from '../controllers/UsersController.js';

const router = express.Router();

// ROUTE UNTUK MENDAPATKAN DATA USER
router.get('/auth', getUserData);

// ROUTE UNTUK SIGN UP
router.post('/signup', signUp, (req, res) => {
    // Logic untuk sign-up
    res.json({ message: 'User registered successfully' });
});

// ROUTE UNTUK LOGIN
router.post('/login', loginUser);

// ROUTE UNTUK LUPA PASSWORD
router.post('/forgot-password', forgotPassword);

// ROUTE UNTUK RESET PASSWORD
router.post('/reset-password', forgotPassword);


export default router;  // Export router agar bisa digunakan di file lain