import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Product = db.define('products',{
    id: {
        type: DataTypes.INTEGER,  // Menggunakan INTEGER untuk id
        primaryKey: true,         // Menentukan id sebagai primary key
        autoIncrement: true       // Membuat id otomatis bertambah
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,  // Menentukan kolom code tidak boleh kosong
        // autoIncrement: true 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false  // Menentukan kolom name tidak boleh kosong
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),  // Menentukan presisi untuk harga
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true  // Menambahkan default value untuk isReady
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false // Menentukan kolom image tidak boleh kosong
    },
    categoryCode: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Pastikan categoryId tidak boleh kosong
        references: {
            model: 'categories', // Nama tabel yang direferensikan
            key: 'code'          // Kolom yang direferensikan,
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Waktu saat data ditambahkan
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Waktu saat data diperbarui
    }
},{
    freezeTableName:true,
    timestamps: true
});

export default Product;

(async() => {
    await db.sync();
})();