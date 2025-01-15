import Cart from "../models/CartModel.js";

// export const addCart = async (req, res) => {
//     try {
//         const { qty, price, name, totalPrice, note, productId, createdAt, updatedAt} = req.body;
//         console.log('Received productId:', productId);
//         console.log('Data Diterima di Backend:', {
//             qty,
//             price,
//             name,
//             totalPrice,
//             note,
//             productId,
//             createdAt,
//             updatedAt
//         });
//         const currentTime = new Date();

//         const newProduct = await Cart.create({
//             qty,
//             price,
//             name,
//             totalPrice,
//             note,
//             productId,
//             createdAt: currentTime,
//             updatedAt: currentTime,
//         });

//         res.status(201).json({ msg: "Produk Berhasil Ditambahkan", data: newProduct });
//     } catch (error) {
//         console.error('🔥 Kesalahan Backend:', error.message);
//         res.status(500).json({ msg: "Kesalahan Server Internal", error: error.message });
//     }
// };

export const addCart = async (req, res) => {
    try {
        const { productId } = req.body;

        // Cek apakah produk sudah ada di cart
        const existingCartItem = await Cart.findOne({ where: { productId } });
        console.log("🛠️ addCart - productId:", productId);
        if (existingCartItem) {
            // Jika produk sudah ada, update qty dan totalPrice
            existingCartItem.qty += 1;
            existingCartItem.totalPrice = existingCartItem.qty * existingCartItem.price;
            await existingCartItem.save();

            return res.status(200).json({ msg: "Qty produk ditambahkan", data: existingCartItem });
        }

        // Jika produk belum ada, buat item baru di cart
        const newProduct = await Cart.create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({ msg: "Produk berhasil ditambahkan ke cart", data: newProduct });
    } catch (error) {
        console.error('🔥 Kesalahan Backend:', error.message);
        res.status(500).json({ msg: "Kesalahan Server Internal", error: error.message });
    }
};



// // FUNGSI UNTUK MENGAMBIL DATA CART
// export const getCart = async (req, res) => {
//     try {
//     const carts = await Cart.findAll();

//     res.status(200).json(carts);
//     } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ msg: "Internal server error" });
//     }
// };

export const getCart = async (req, res) => {
    try {
        const { productId } = req.query; // Ambil productId dari query

        if (productId) {
            // Jika ada productId di query, filter berdasarkan itu
            const cart = await Cart.findAll({
                where: {
                    productId: productId
                }
            });
            console.log("🛠️ Filtered Cart by productId:", cart);
            return res.status(200).json(cart);
        }

        // Jika tidak ada productId, ambil semua data cart
        const carts = await Cart.findAll();
        console.log("🛠️ All Cart Data:", carts);
        res.status(200).json(carts);
    } catch (error) {
        console.error('🔥 Error getCart:', error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};



// FUNGSI UNTUK MEMPERBARUI DATA CART
export const updateCart = async (req, res) => {
    try {
      // Cek apakah data cart dengan ID yang diberikan ada
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
        return res.status(404).json({ msg: "Cart not found" });
    }

      // Update data cart
    await Cart.update(req.body, {
        where: {
        id: req.params.id,
        },
    });

    res.status(200).json({ msg: "Cart updated successfully" });
    } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal server error" });
    }
};


// untuk menghapus data cart
export const deleteCart = async(req, res) =>{
    try{
        await Cart.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Cart deleted"});
    }catch (error) {
        console.log(error.message);        
    }
};