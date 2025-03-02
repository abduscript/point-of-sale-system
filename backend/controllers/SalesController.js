import Orders from "../models/OrdersModel.js";
import { Op, Sequelize } from "sequelize";

        // fungsi untuk salesStat
            // Fungsi untuk menghitung total penjualan berdasarkan waktu
            export const totalPenjualan = async (req, res) => {
                try {
                    const { timeFrame } = req.query; // Ambil parameter waktu dari frontend

                    // Tentukan batas waktu berdasarkan timeFrame (daily, weekly, monthly, yearly)
                    let startDate = new Date();
                    let endDate = new Date();

                    if (timeFrame === "daily") {
                        startDate.setHours(0, 0, 0, 0);
                        endDate.setHours(23, 59, 59, 999);
                    } else if (timeFrame === "weekly") {
                        startDate.setDate(startDate.getDate() - 7);
                    } else if (timeFrame === "monthly") {
                        startDate.setMonth(startDate.getMonth() - 1);
                    } else if (timeFrame === "yearly") {
                        startDate.setFullYear(startDate.getFullYear() - 1);
                    }

                    // Query database untuk mengambil total penjualan dan jumlah barang yang terjual
                    const sales = await Orders.findAll({
                        where: {
                            date: {
                                [Op.between]: [startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0]],
                            },
                        },
                        attributes: [
                            [Sequelize.fn("DATE", Sequelize.col("date")), "date"], // Ambil tanggal
                            [Sequelize.fn("SUM", Sequelize.col("total")), "totalSales"], // Total uang yang didapat dari penjualan
                            [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalItemsSold"], // Jumlah barang yang terjual
                        ],
                        group: ["date"], // Kelompokkan berdasarkan tanggal
                        order: [[Sequelize.col("date"), "ASC"]],
                    });

                    res.json({
                        timeFrame,
                        salesData: sales,
                    });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: "Gagal mengambil data penjualan" });
                }
            };
