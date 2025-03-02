import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Orders = db.define('ordereds', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product: {
        type: DataTypes.JSON, // Menyimpan data detail dalam bentuk JSON
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER, // Menyimpan data detail dalam bentuk JSON
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    note: {
        type: DataTypes.JSON, // Menyimpan data detail dalam bentuk JSON
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    }, {
    freezeTableName: true,
    timestamps: false,
    });

export default Orders;

(async () => {
await db.sync();
})();
