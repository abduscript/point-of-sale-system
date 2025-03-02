import Product from "../models/ProductModel.js";

// FUNGSI UNTUK MENDAPATKAN SEMUA PRODUK
// export const getProducts = async(req, res) =>{
//     try{
//         const response = await Product.findAll();
//         res.status(200).json(response);
//     }catch (error) {
//         console.log(error.message);        
//     }
// }
export const getProducts = async (req, res) => {
    try {
        const { categoryCode } = req.query;
        const whereCondition = categoryCode
        ? { categoryCode: parseInt(categoryCode) } // Sesuaikan tipe data dengan database
        : {}; // Jika tidak ada filter, ambil semua produk
        
        const products = await Product.findAll({ where: whereCondition });
        res.status(200).json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error fetching products" });
    }
};


// // FUNGSI UNTUK MENGAMBIL DATA PRODUK BERDASARKAN ID
// export const getProductById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log('ID dari Backend:', id); // Debugging

//         const response = await Product.findOne({
//             where: { id }
//         });

//         if (!response) {
//             console.warn(`Produk dengan ID ${id} tidak ditemukan.`);
//             return res.status(404).json({ message: 'Product not found' });
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
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID harus berupa angka" });
        }
    
        const response = await Product.findOne({
            where: { id },
        });
    
        if (!response) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }
    
        res.status(200).json(response);
        } catch (error) {
        console.error("Error fetching product by ID:", error.message);
        res.status(500).json({ message: "Kesalahan Server", error: error.message });
        }
    };
    


// FUNGSI UNTUK MENGAMBIL DATA PRODUK BERDASARKAN KATEGORI
// export const getProductByCategory = async (req, res) => {
//     try {
//         const response = await Product.findAll({
//             where: {
//                 categoryCode: req.params.code // Ambil dari params
//             }
//         });
//         res.status(200).json(response); // Kirim semua produk yang sesuai
//     } catch (error) {
//         console.error("Error saat mengambil produk berdasarkan kategori:", error);
//         res.status(500).json({ msg: "Terjadi kesalahan saat mengambil produk berdasarkan kategori." });
//     }
// };
export const getProductByCategory = async (req, res) => {
    try {
        const { code } = req.params;
        if (!code) {
            return res.status(400).json({ msg: "Parameter 'code' tidak disediakan." });
        }

        const response = await Product.findAll({
            where: { categoryCode: code }
        });

        if (!response.length) {
            return res.status(404).json({ msg: "Tidak ada produk untuk kategori ini." });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Error saat mengambil produk berdasarkan kategori:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat mengambil produk berdasarkan kategori." });
    }
};



// FUNGSI UNTUK MENAMBAHKAN PRODUK
export const addProduct = async (req, res) => {
    try {
        const { code, name, price, stock, categoryCode, createdAt, updatedAt } = req.body;
        const image = req.file ? req.file.filename : null; // Simpan nama file gambar

        console.log('Data Diterima di Backend:', {
            code,
            name,
            price,
            stock,
            image,
            categoryCode,
            createdAt,
            updatedAt
        });
        const currentTime = new Date();

        const newProduct = await Product.create({
            code,
            name,
            price,
            stock,
            image,
            categoryCode,
            createdAt: currentTime,
            updatedAt: currentTime,
        });

        res.status(201).json({ msg: "Produk Berhasil Ditambahkan", data: newProduct });
    } catch (error) {
        console.error('🔥 Kesalahan Backend:', error.message);
        res.status(500).json({ msg: "Kesalahan Server Internal", error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { code, name, price, stock, image, categoryCode, updatedAt } = req.body;
        console.log("req.body:", req.body);

        await Product.update(
            { code, name, price, stock, image, categoryCode, updatedAt },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        res.status(200).json({ msg: "Product updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// export const updateProduct = async (req, res) => {
//     try {
//         const { code, name, price, isReady, categoryCode } = req.body;
//         const image = req.file ? req.file.filename : undefined; // Simpan nama file gambar jika ada
//         console.log("File uploaded:", req.file); // Debug file yang diunggah
//         console.log("Form data:", req.body); // Debug data form
//         const updateData = {
//             code,
//             name,
//             price,
//             isReady,
//             categoryCode,
//         };

//         // Tambahkan `image` hanya jika ada file yang diunggah
//         if (image) {
//             updateData.image = image;
//         }

//         await Product.update(updateData, {
//             where: { id: req.params.id },
//         });

//         res.status(200).json({ msg: "Product updated" });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// };



// FUNGSI UNTUK MENGHAPUS PRODUK DARI DATABASE
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};
