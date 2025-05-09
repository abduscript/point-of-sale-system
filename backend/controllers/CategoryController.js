import Category from "../models/CategoryModel.js";

// FUNGSI UNTUK MENAMBAH KATEGORI PRODUK
export const addCategory = async(req, res) =>{
    req.body = {
        name: req.body.name,
        code: req.body.code
    }
    try{
        await Category.create(req.body)
        res.status(201).json({msg : "Category Added"});
    }catch (error) {
        console.log(error.message);        
    }
};

// FUNGSI UNTUK MENDAPAT SEMUA KATEGORI
export const getCategories = async (req, res) => {
    try {
      const categories = await Category.findAll();  // Mengambil semua kategori dari tabel
        res.status(200).json(categories);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat mengambil kategori." });
    }
};


// FUNGSI UNTUK MENDAPATKAN KATEGORI BERDASARKAN CODE
export const getCategoryByCode = async (req, res) => {
    try {
        const response = await Category.findOne({
            where: {
                code: parseInt(req.params.code) // Gunakan 'code' sebagai parameter
            },
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'Category not found' }); // Tambahkan handling jika category tidak ditemukan
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' }); // Tambahkan error handling dengan status 500
    }
};

// // FUNGSI UNTUK MENGUPDATE KATEGORI BERDASARKAN CODE
// export const deleteCategory = async (req, res) => {
//     try {
//         const response = await Category.destroy({
//             where: {
//                 code: req.params.code // Gunakan 'code' sebagai parameter
//             },
//         });
//         if (response) {
//             res.status(200).json({ message: 'Category deleted' });
//         } else {
//             res.status(404).json({ message: 'Category not found' }); // Tambahkan handling jika category tidak ditemukan
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'Internal Server Error' }); // Tambahkan error handling dengan status 500
//     }
// }

