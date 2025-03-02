import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
    // Ambil header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Tambahkan data user ke req.user
        console.log('Decoded User:', decoded); // Debug untuk melihat isi token yang sudah didecode
        next(); // Lanjut ke middleware berikutnya
    } catch (error) {
        // console.error(process.env.JWT_SECRET);
        console.error('❌ Token verification failed:', error.message);
        res.status(403).json({ message: 'Token is not valid or expired' });
    }
};
