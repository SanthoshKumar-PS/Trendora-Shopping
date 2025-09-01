import express from "express";
import { addProduct, viewSellerProducts } from "../../controllers/seller/sellerProductController";
import { authenticateUser } from "../../middleware/authenticateUser";

export const sellerProductRouter = express.Router();


sellerProductRouter.get('/viewproducts', authenticateUser, viewSellerProducts)
sellerProductRouter.post("/addProduct", authenticateUser, addProduct)
