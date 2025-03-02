import { Sequelize } from "sequelize";

const db = new Sequelize('pos_db','root','',{
  host: 'localhost',
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