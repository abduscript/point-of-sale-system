// import path from 'path';
// import fs from 'fs';

// const cartsFilePath = path.resolve('backend/carts.json');


// // FUNGSI UNTUK MELIHAT DATA CART
// export const getCart = (req, res) => {
//     const productId = req.query.productId;

//     fs.readFile(cartsFilePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error reading cart data' });
//         }
//         const carts = JSON.parse(data);
//         const productCart = carts.find(cart => cart.productId == productId);

//         if (!productCart) {
//             return res.status(404).json({ message: 'Product not found in cart' });
//         }

//         res.status(200).json(productCart);
//     });
// };


// // FUNGSI UNTUK MENAMBAHKAN DATA KE DALAM CART
// export const addCart = (req, res) => {
//     fs.readFile(cartsFilePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error reading cart data' });
//         }

//         const carts = JSON.parse(data);
//         const newCartItem = req.body;

//         // Cek apakah produk sudah ada di cart
//         const existingItem = carts.find(item => item.productId == newCartItem.productId);

//         if (existingItem) {
//             // Kalau sudah ada, update qty dan totalPrice
//             existingItem.qty += newCartItem.qty;
//             existingItem.totalPrice = existingItem.price * existingItem.qty;
//         } else {
//             // Kalau belum ada, tambahkan produk baru
//             carts.push(newCartItem);
//         }

//         // Simpan perubahan ke carts.json
//         fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Error writing cart data' });
//             }

//             res.status(200).json(newCartItem);
//         });
//     });
// };


// // FUNGSI UNTUK MENGHAPUS DATA CART
// export const deleteCart = (req, res) => {
//     fs.writeFile(cartsFilePath, JSON.stringify([], null, 2), (err) => {
//         if (err) {
//         return res.status(500).json({ message: 'Error clearing cart' });
//         }
//         res.status(200).json({ message: 'Cart cleared successfully' });
//     });
// };
import fs from 'fs';
import path from 'path';

// const cartsFilePath = path.join('backend','carts.json');
const cartsFilePath = 'C:/Users/user/Desktop/Point_Of_Sale_System/backend/carts.json';
console.log('Cek path:', cartsFilePath);

// Fungsi untuk membaca data dari carts.json
const readCartsFromFile = () => {
    try {
        const data = fs.readFileSync(cartsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading cart data:', error);
        console.log('Mencoba baca file di:', filePath);
        return [];
    }
};

// Fungsi untuk menulis data ke carts.json
const writeCartsToFile = (carts) => {
    try {
        fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    } catch (error) {
        console.error('Error writing cart data:', error);
    }
};

// Get Cart
export const getCart = (req, res) => {
    try {
        const productId = parseInt(req.query.productId);
        const carts = readCartsFromFile();
        const cartItem = carts.find(item => item.productId === productId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Error reading cart data' });
    }
};

// Add to Cart
export const addCart = (req, res) => {
    try {
        const { productId, name, price, qty } = req.body;
        let carts = readCartsFromFile();
        const existingCartItem = carts.find(item => item.productId === productId);

        if (existingCartItem) {
            existingCartItem.qty += qty;
            existingCartItem.totalPrice = existingCartItem.qty * price;
        } else {
            const newCartItem = { productId, name, price, qty, totalPrice: price * qty };
            carts.push(newCartItem);
        }

        writeCartsToFile(carts);
        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart' });
    }
};

// Clear Cart
export const deleteCart = (req, res) => {
    try {
        writeCartsToFile([]);  // Clear all items
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart' });
    }
};
