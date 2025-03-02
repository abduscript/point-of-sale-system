import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Category = db.define('categories',{
    code: {
        type: DataTypes.STRING,  // Menggunakan INTEGER untuk id
        primaryKey: true,         // Menentukan id sebagai primary key
//        autoIncrement: true        Membuat id otomatis bertambah
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false  // Menentukan kolom name tidak boleh kosong
    }
},{
    freezeTableName:true
});

export default Category;

(async() => {
    await db.sync();
})();