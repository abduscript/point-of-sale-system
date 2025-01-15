import Orders from "../models/OrdersModel.js";

// FUNGSI UNTUK MENGIRIM DATA KE DATABASE
//  = async (req, res) => {
//     try {
//         const { date, total, details, username } = req.body;

//     // Pastikan userId valid
//     const user = await User.findByPk(username);
//     if (!user) {
//         return res.status(400).json({ msg: 'Invalid username' });
//     }

//     const order = await Orders.create({ date, total, details, username });
        
//         res.status(201).json({ msg: "Order was saved successfully", order });
//     } catch (error) {
//         console.error("Error saving order:", error);
//         res.status(500).json({ error: error.message });
//     }
//     };
    

export const saveOrder = async (req, res) => {
    try {
        const { date, total, details } = req.body;

        if (!date || !total || !details) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        console.log('User from token:', req.user); // Debug untuk memastikan user terbaca

        // Proses penyimpanan ke database
        const newOrder = await Orders.create({
            date,
            total,
            details,
            username: req.user.username, // Menggunakan username dari token
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error('❌ Error saat menyimpan order:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



// FUNGSI UNTUK MENDAPATKAN SEMUA DATA ORDER KE FRONTEND
export const getOrders = async (req, res) => {
    try {
      const orders = await Orders.findAll();  // Mengambil semua data order dari tabel
        res.status(200).json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "something went wrong when load the orders" });
    }
};
