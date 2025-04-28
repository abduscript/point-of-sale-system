// // import sumber daya yang dibutuhkan
//         import ProductRoute from "./routes/ProductRoute.js";
//         import CategoryRoute from "./routes/CategoryRoute.js";
//         import CartRoute from "./routes/CartRoute.js";
//         import OrdersRoute from "./routes/OrdersRoute.js";
//         import UpdateRoute from "./routes/UpdateRoute.js";
//         import AuthRoute from "./routes/AuthRoute.js";
//         import db from "./config/Database.js";
//         import express from "express";
//         import cors from "cors";
//         import fs from "fs";
//         import path from "path";
//         import { createServer } from 'http';
//         import { WebSocketServer } from 'ws';


//         // Websocket
//         const app = express();
//         const server = createServer(app);
//         const wss = new WebSocketServer({ server });
//         wss.on('connection', (ws) => {
//           console.log('A client connected');

//           ws.on('error', (err) => {
//             console.error('WebSocket error:', err);
//           });
      
          
//           ws.on('message', (message) => {
//             const data = JSON.parse(message);
            
//             if (data.type === 'update_stock') {
//               // Broadcast ke semua client yang masih aktif
//               wss.clients.forEach(client => {
//                 if (client.readyState === WebSocket.OPEN) {
//                           client.send(JSON.stringify({
//                               type: 'stock_updated',
//                               productId: data.productId,
//                               newStock: data.newStock
//                             }));
//                         }
//                       });
//                   }
                  
//                   if (data.type === 'update_cart') {
//                     // Kirim update cart ke semua client
//                     wss.clients.forEach(client => {
//                         if (client.readyState === WebSocket.OPEN) {
//                             client.send(JSON.stringify({
//                               type: 'cart_updated',
//                               cart: data.cart
//                             }));
//                           }
//                         });
//                       }
//                     });
                    
//                     ws.on('close', () => {
//                         console.log('A client disconnected');
//                     });

//                 });
//         server.listen(8080, () => {
//           console.log('WebSocket server running on ws://localhost:8080');
//         });
        
//         // Middleware
//         app.use( cors({
//         origin: 'http://localhost:5173', // Atau tentukan origin frontend misalnya: ''
//         methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//         allowedHeaders: ['Content-Type', 'Authorization'],
//         }));
//         app.use(express.json());
//         app.use(express.urlencoded({ extended: true }));
//         app.use(ProductRoute);
//         app.use(CategoryRoute);
//         app.use('/api', CartRoute);  // Prefix API route
//         app.use(OrdersRoute);
//         app.use(UpdateRoute);
//         app.use('/api/auth', AuthRoute);
        
        
//         // function-function yang dibutuhkan
//         const uploadDir = "uploads";
//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir);
//           console.log("Folder 'uploads' berhasil dibuat");
//         } else {
//           console.log("Folder 'uploads' sudah ada");
//         }
        
//         if (!fs.existsSync(path.resolve("uploads"))) {
//           fs.mkdirSync(path.resolve("uploads"));
//         }
        
//         app.use("/uploads", express.static(uploadDir));


// // Sync database dengan opsi alter
// db.sync({ alter: true })
//     .then(() => console.log('Database synced with Sequelize (altered)'))
//     .catch(err => console.error('Error syncing database:', err));


// // Menjalankan server
// app.listen(5001, () => {
//   console.log(`Server berjalan di http://localhost:5001`);
// });
// Import sumber daya yang dibutuhkan
import ProductRoute from "./routes/ProductRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import CartRoute from "./routes/CartRoute.js";
import OrdersRoute from "./routes/OrdersRoute.js";
import UpdateRoute from "./routes/UpdateRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import db from "./config/Database.js";
import SalesRoute from "./routes/SalesRoute.js";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { createServer } from "http";
import { WebSocketServer } from "ws";

// WebSocket dan Express dalam satu server
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("A client connected");

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "update_stock") {
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(
            JSON.stringify({
              type: "stock_updated",
              productId: data.productId,
              newStock: data.newStock,
            })
          );
        }
      });
    }

    if (data.type === "update_cart") {
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(
            JSON.stringify({
              type: "cart_updated",
              cart: data.cart,
            })
          );
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("A client disconnected");
  });
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", ProductRoute);
app.use("/api", CategoryRoute);
app.use("/api", CartRoute);
app.use("/api", OrdersRoute);
app.use("/api", UpdateRoute);
app.use("/api", AuthRoute);
app.use("/api", SalesRoute);

// Cek dan buat folder uploads
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Folder 'uploads' berhasil dibuat");
} else {
  console.log("Folder 'uploads' sudah ada");
}
if (!fs.existsSync(path.resolve("uploads"))) {
  fs.mkdirSync(path.resolve("uploads"));
}
app.use("/uploads", express.static(uploadDir));

// Sync database
db.sync({ alter: true })
  .then(() => console.log("Database synced with Sequelize (altered)"))
  .catch((err) => console.error("Error syncing database:", err));

// Gabungkan Express dan WebSocket ke satu server
server.listen(5001, () => {
  console.log(`Server berjalan di http://localhost:5001`);
  console.log("WebSocket server running on ws://localhost:5001");
});
