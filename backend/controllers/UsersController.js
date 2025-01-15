import User from "../models/UsersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();


export const signUp = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user di MongoDB
        const newUser = new User({ username, email, password: hashedPassword, role: role || 'user' });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};



// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ where: { email } });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign(
//             { id: user.id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in', error });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });  // Mencari user berdasarkan email

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Bandingkan password yang dimasukkan dengan hash di database
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Buat JWT token dan kirim ke frontend
//         const token = jwt.sign(
//             { id: user.id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in', error });
//     }
// };


// // Login Function
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     // Create JWT Token
//     const token = jwt.sign(
//         { userId: user._id, name: user.name },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//     );
//     res.json({ token, userId: user._id, name: user.name });
//     } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//     }
// };

// login function
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password wajib diisi' });
        }

        // Cari user di database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User tidak ditemukan' });
        }

        // Periksa password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password salah' });
        }

        // Buat JWT Token
        // const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET, // Gunakan SECRET yang sama di middleware
            { expiresIn: '1h' } // Token berlaku selama 1 jam
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};




// Endpoint untuk mengambil data pengguna
export const getUserData = async (req, res) => {
    try {
        // Ambil token dari header Authorization
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        
        if (!token) {
            return res.status(401).json({ message: 'Token tidak ada' });
        }

        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ambil data pengguna dari database berdasarkan ID yang ada di token
        const user = await User.findById(decoded.id);  // decoded.id adalah ID user yang sudah dienkripsi dalam token

        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        // Kirimkan data pengguna ke frontend
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error });
    }
};
