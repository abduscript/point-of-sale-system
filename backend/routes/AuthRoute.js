import express from 'express';
import {
    signUp,
    loginUser,
    // getUserData
} from '../controllers/UsersController.js';

const router = express.Router();

// ROUTE UNTUK SIGN UP
router.post('/signup', signUp, (req, res) => {
    // Logic untuk sign-up
    res.json({ message: 'User registered successfully' });
});

// ROUTE UNTUK LOGIN
router.post('/login', loginUser);

// // ROUTE UNTUK MENGAMBIL DATA USER YANG LOGIN
// router.get('/api/users/me', getUserData);

export default router;  // Export router agar bisa digunakan di file lain