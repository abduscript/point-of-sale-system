import ProductRoute from "./routes/ProductRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import CartRoute from "./routes/CartRoute.js";
import OrdersRoute from "./routes/OrdersRoute.js";
import UpdateRoute from "./routes/UpdateRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import db from "./config/Database.js";
import connectMongoDB from "./config/Mongodb.js";
import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Atau tentukan origin frontend misalnya: ''
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ProductRoute);
app.use(CategoryRoute);
app.use(CartRoute);
app.use(OrdersRoute);
app.use(UpdateRoute);
app.use('/api/auth', AuthRoute);

// Connect to MongoDB
connectMongoDB();  // Menghubungkan ke MongoDB

// Sync database dengan opsi alter
db.sync({ alter: true })
    .then(() => console.log('Database synced with Sequelize (altered)'))
    .catch(err => console.error('Error syncing database:', err));


// Menjalankan server
app.listen(5000, () => {
  console.log(`Server berjalan di http://localhost:5000`);
});
