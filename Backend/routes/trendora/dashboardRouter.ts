import express from "express";
import { getLast7DaysSalesBySeller, getRecentTransactions } from "../../controllers/trendora/seller/dashboardController";
import { authenticateUser } from "../../middleware/authenticateUser";

export const dashboardRouter = express.Router();

dashboardRouter.get('/getLastWeekSales', authenticateUser, getLast7DaysSalesBySeller)
dashboardRouter.get('/getRecentTransactions', authenticateUser, getRecentTransactions)