import Orders from "../models/OrdersModel.js";    
import Product from "../models/ProductModel.js";    
import sequelize from "sequelize";

// export const saveOrder = async (req, res) => {
//     try {
//         const { date, product, price, total, note } = req.body;

//         if (!date || !product || !price || !total || !note) {
//             return res.status(400).json({ message: 'Invalid order data' });
//         }

//         console.log('User from token:', req.user); // Debug untuk memastikan user terbaca

//         // Proses penyimpanan ke database
//         const newOrder = await Orders.create({
//             date,
//             product,
//             price,
//             total,
//             note,
//             username: req.user.username, // Menggunakan username dari token
//         });

//         res.status(201).json(newOrder);
//     } catch (error) {
//         console.error('❌ Error saat menyimpan order:', error.message);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// };


export const saveOrder = async (req, res) => {
    try {
        const { date, product, price, total, note } = req.body;

        if (!date || !product || !price || !total || !note) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        console.log('User from token:', req.user); // Debug untuk memastikan user terbaca

        // Pastikan product berbentuk array dan memiliki quantity
        const formatProductText = (products) => {
            try {
                const parsedProducts = typeof products === "string" ? JSON.parse(products) : products;
                if (!Array.isArray(parsedProducts)) return products; // Jika bukan array, langsung return

                return parsedProducts.map(p => `${p.name}`).join(", ");
            } catch (error) {
                return products; // Jika gagal parse, langsung kembalikan data aslinya
            }
        };

        // Pastikan note berbentuk teks biasa
        const formatNoteText = (notes) => {
            try {
                const parsedNotes = typeof notes === "string" ? JSON.parse(notes) : notes;
                if (!Array.isArray(parsedNotes)) return notes; // Jika bukan array, langsung return

                return parsedNotes.map(n => n.note || " ").join(" "); // Mengambil isi `note`
            } catch (error) {
                return notes; // Jika gagal parse, langsung kembalikan data aslinya
            }
        };

        // Format semua field sebelum disimpan
        const formattedProduct = formatProductText(product);
        const formattedNote = formatNoteText(note);

        // Proses penyimpanan ke database
        const newOrder = await Orders.create({
            date,
            product: formattedProduct,  //Produk dalam bentuk teks dengan jumlahnya
            price,                     // Harga tetap teks biasa
            total,
            note: formattedNote,       // Note dalam teks biasa
            username: req.user.username, // Menggunakan username dari token
            quantity: product.reduce((sum, p) => sum + (p.quantity), 0), // Total qty dari semua produk
        });

        for (let item of product) {
            await Product.update(
                { stock: sequelize.literal(`stock - ${item.quantity}`) }, 
                { where: { name: item.name } }
            );
        }

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
