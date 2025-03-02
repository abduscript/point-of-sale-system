import Product from "../models/ProductModel.js";

// export const getProductById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log('ID dari Backend:', id); // Debugging

//         const response = await Product.findOne({
//             where: { id }
//         });

//         if (!id || isNaN(id)) {
//             return res.status(400).json({ message: 'Invalid product ID' });
//         }
        

//         res.status(200).json(response);
//     } catch (error) {
//         console.error('Error fetching product by ID:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            console.error("ID produk tidak valid:", id);
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        console.log('ID dari Backend:', id); // Debugging

        const response = await Product.findOne({ where: { id } });

        if (!response) {
            console.warn(`Produk dengan ID ${id} tidak ditemukan.`);
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching product by ID:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
