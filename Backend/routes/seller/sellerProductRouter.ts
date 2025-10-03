import express from "express";
import { addProduct, getProductDetails, updateProduct, viewSellerProducts } from "../../controllers/seller/sellerProductController";
import { authenticateUser } from "../../middleware/authenticateUser";

export const sellerProductRouter = express.Router();


sellerProductRouter.get('/viewproducts', authenticateUser, viewSellerProducts)
sellerProductRouter.post("/addProduct", authenticateUser, addProduct)
sellerProductRouter.patch("/updateProduct", authenticateUser, updateProduct)
sellerProductRouter.get("/product/:productId", authenticateUser, getProductDetails)
