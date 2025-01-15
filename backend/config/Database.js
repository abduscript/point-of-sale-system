import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

const db = new Sequelize('process.env.DB_NAME','process.env.DB_USER','',{
  host: 'process.env.DB_HOST',
  dialect: 'mysql'
});

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//     // process.exit(1);
//   } else {
//     console.log("Connected to the database");
//   }
// });

export default db;