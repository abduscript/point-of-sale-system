import User from "../models/UsersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Op } from "sequelize";  // Tambahkan ini untuk operator Sequelize

dotenv.config();

// REGISTER USER
export const signUp = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah digunakan. Gunakan email lain.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// LOGIN USER
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password wajib diisi' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'User tidak ditemukan' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Password salah' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '20h' }
        );
        

        res.json({
            message: 'Login berhasil',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
    }
};

// // GET USER DATA
// export const getUserData = async (req, res) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];

//         if (!token) {
//             return res.status(401).json({ message: 'Token tidak ada' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findByPk(decoded.id);

//         if (!user) {
//             return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
//         }

//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
//     }
// };


// // GET USER DATA
// export const getUserData = async (req, res) => {
//     try {
//         // Pastikan ada token di header
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
//         }

//         // Ambil token dari header
//         const token = authHeader.split(' ')[1];

//         // Verifikasi token
//         let decoded;
//         try {
//             decoded = jwt.verify(token, process.env.JWT_SECRET);
//         } catch (err) {
//             if (err.name === 'TokenExpiredError') {
//                 return res.status(401).json({ message: 'Token sudah kedaluwarsa. Silakan login ulang.' });
//             } else if (err.name === 'JsonWebTokenError') {
//                 return res.status(403).json({ message: 'Token tidak valid.' });
//             } else {
//                 return res.status(500).json({ message: 'Terjadi kesalahan dalam verifikasi token.', error: err.message });
//             }
//         }

//         // Cari user berdasarkan ID yang ada di token
//         if (!decoded.id) {
//             return res.status(400).json({ message: 'Token tidak valid: ID user tidak ditemukan.' });
//         }
        
//         const user = await User.findByPk(decoded.id, {
//             attributes: ['id', 'username', 'email', 'role']
//         });
        
//         if (!user) {
//             return res.status(404).json({ message: 'Pengguna tidak ditemukan di database.' });
//         }

//         // Kirim data user
//         res.json(user);
//     } catch (error) {
//         console.error('❌ Error di getUserData:', error);
//         res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
//     }
// };


// GET USER DATA
export const getUserData = async (req, res) => {
    console.log("✅ Request diterima di /api/auth");
    console.log("Headers:", req.headers);

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log("❌ Token tidak ditemukan");
            return res.status(401).json({ message: "Token tidak ditemukan" });
        }

        const token = authHeader.split(" ")[1];
        console.log("🔑 Token diterima:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔓 Token decoded:", decoded);

        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'username', 'email', 'role']
        });

        if (!user) {
            console.log("❌ User tidak ditemukan");
            return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }

        console.log("✅ User ditemukan:", user);
        res.json(user);
    } catch (error) {
        console.error("❌ Error di getUserData:", error);
        res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
};



// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan!' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = new Date(resetTokenExpiration);  // Pastikan ini bertipe DATE
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const resetLink = `https://localhost:5001/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            to: email,
            subject: 'Reset Password',
            html: `<p>Anda menerima email ini karena kami menerima permintaan reset password. Klik link berikut untuk mereset password Anda:</p><a href="${resetLink}">${resetLink}</a>`
        });

        res.status(200).json({ message: 'Link reset password telah dikirim ke email Anda.' });

    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
    }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: new Date() }
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'Token tidak valid atau sudah kedaluwarsa.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({ message: 'Password berhasil direset.' });

    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
    }
};
