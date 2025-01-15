// import Product from "../models/ProductModel.js";

// // FUNGSI UNTUK MENDAPATKAN SEMUA PRODUK
// export const getProducts = async(req, res) =>{
//     try{
//         const response = await Product.findAll();
//         res.status(200).json(response);
//     }catch (error) {
//         console.log(error.message);        
//     }
// }

// // // FUNGSI UNTUK MENDAPATKAN SEMUA PRODUK BERDASARKAN KATEGORI ID
// // export const getProductById = async(req, res) =>{
// //     try{
// //         const response = await Product.findOne({
// //             where: {
// //                 id: req.params.id
// //             }
// //         });
// //         res.status(200).json(response);
// //     }catch (error) {
// //         console.log(error.message);        
// //     }
// // }

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




// // // FUNGSI UNTUK MENAMBAHKAN PRODUK
// // export const addProduct = async(req, res) =>{
// //     try{
// //         const { id, code, name, price, isReady, image, categoryId } = req.body;
// //         await Product.create(req.body)
// //         res.status(201).json({msg: "Product Added"});
// //     }catch (error) {
// //         console.log(error.message);        
// //     }
// // }


// export const addProduct = async (req, res) => {
//     try {
//         const { id, code, name, price, isReady, image, categoryId, createdAt, updatedAt } = req.body;

//         console.log('Data Diterima di Backend:', {
//             id,
//             code,
//             name,
//             price,
//             isReady,
//             image,
//             categoryId,
//             createdAt,
//             updatedAt
//         });

//         // Validasi data
//         // if (!id || !code || !name || !price || !isReady || !image || !categoryId) {
//         //     return res.status(400).json({ msg: "Semua field harus diisi!" });
//         // }

//         // if (typeof price !== 'number' || price <= 0) {
//         //     return res.status(400).json({ msg: "Harga harus berupa angka positif!" });
//         // }

//         // if (typeof isReady !== 'boolean') {
//         //     return res.status(400).json({ msg: "isReady harus berupa boolean!" });
//         // }

//         // Tambahkan createdAt dan updatedAt
//         const currentTime = new Date();

//         const newProduct = await Product.create({
//             id,
//             code,
//             name,
//             price,
//             isReady,
//             image,
//             categoryId,
//             createdAt: currentTime,
//             updatedAt: currentTime,
//         });

//         res.status(201).json({ msg: "Produk Berhasil Ditambahkan", data: newProduct });
//     } catch (error) {
//         console.error('🔥 Kesalahan Backend:', error.message);
//         res.status(500).json({ msg: "Kesalahan Server Internal", error: error.message });
//     }
// };




// // FUNGSI UNTUK UPDATE PRODUK
// export const updateProduct = async(req, res) =>{
//     try{
//         await Product.update(req.body,{
//             where:{
//                 id: req.params.id
//             }
//         })
//         res.status(200).json({msg: "Product updated"});
//     }catch (error) {
//         console.log(error.message);        
//     }
// };

// // FUNGSI UNTUK MENGHAPUS PRODUK DARI DATABASE
// export const deleteProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByPk(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         await product.destroy();
//         res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// };


import Product from "../models/ProductModel.js";

// FUNGSI UNTUK MENDAPATKAN SEMUA PRODUK
export const getProducts = async(req, res) =>{
    try{
        const response = await Product.findAll();
        res.status(200).json(response);
    }catch (error) {
        console.log(error.message);        
    }
}

// FUNGSI UNTUK MENGAMBIL DATA PRODUK BERDASARKAN ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('ID dari Backend:', id); // Debugging

        const response = await Product.findOne({
            where: { id }
        });

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


// FUNGSI UNTUK MENGAMBIL DATA PRODUK BERDASARKAN KATEGORI
export const getProductByCategory = async (req, res) => {
    try {
        const response = await Product.findAll({
            where: {
                categoryId: req.params.categoryId // Ambil dari params
            }
        });
        res.status(200).json(response); // Kirim semua produk yang sesuai
    } catch (error) {
        console.error("Error saat mengambil produk berdasarkan kategori:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat mengambil produk berdasarkan kategori." });
    }
};


// FUNGSI UNTUK MENAMBAHKAN PRODUK
export const addProduct = async (req, res) => {
    try {
        const { id, code, name, price, isReady, image, categoryId, createdAt, updatedAt } = req.body;

        console.log('Data Diterima di Backend:', {
            id,
            code,
            name,
            price,
            isReady,
            image,
            categoryId,
            createdAt,
            updatedAt
        });
        const currentTime = new Date();

        const newProduct = await Product.create({
            id,
            code,
            name,
            price,
            isReady,
            image,
            categoryId,
            createdAt: currentTime,
            updatedAt: currentTime,
        });

        res.status(201).json({ msg: "Produk Berhasil Ditambahkan", data: newProduct });
    } catch (error) {
        console.error('🔥 Kesalahan Backend:', error.message);
        res.status(500).json({ msg: "Kesalahan Server Internal", error: error.message });
    }
};


// FUNGSI UNTUK UPDATE PRODUK
export const updateProduct = async(req, res) =>{
    try{
        await Product.update(req.body,{
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Product updated"});
    }catch (error) {
        console.log(error.message);        
    }
};

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
