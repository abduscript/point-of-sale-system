import express from "express";
import { totalPenjualan } from "../controllers/SalesController.js";

const router = express.Router();

router.get("/sales", totalPenjualan);

export default router;
