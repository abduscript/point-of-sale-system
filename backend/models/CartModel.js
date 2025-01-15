import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Cart = db.define('carts',{
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        // allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull: true,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        // allowNull: true,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
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
    timestamps:true
});

export default Cart;

(async() => {
    await db.sync();
})();