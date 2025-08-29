import express from "express";
import { addProduct, viewSellerProducts } from "../../controllers/seller/productController";
import { authenticateUser } from "../../middleware/authenticateUser";

export const productRouter = express.Router();

productRouter.get('/viewproducts', authenticateUser, viewSellerProducts)
productRouter.post("/addProduct", authenticateUser, addProduct)
