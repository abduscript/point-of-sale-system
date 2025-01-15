import Category from "../models/CategoryModel.js";

// FUNGSI UNTUK MENAMBAH KATEGORI PRODUK
export const addCategory = async(req, res) =>{
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

// FUNGSI UNTUK MENDAPATKAN KATEGORI BERDASARKAN ID PRODUK
export const getCategoryById = async(req, res) =>{
    try{
        const response = await Category.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    }catch (error) {
        console.log(error.message);        
    }
}
