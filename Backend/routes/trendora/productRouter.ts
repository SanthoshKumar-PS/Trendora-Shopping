import express from 'express';
import { authenticateUser } from '../../middleware/authenticateUser';
import { getProductDetailsById,getRecommendedProducts } from '../../controllers/trendora/productController';

export const productRouter = express.Router()

productRouter.get('/productdetails', authenticateUser, getProductDetailsById)
productRouter.get('/recommendproducts', authenticateUser, getRecommendedProducts)