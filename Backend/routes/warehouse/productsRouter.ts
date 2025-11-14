import express from 'express'
import { getAllProducts, getLowStockProducts } from '../../controllers/warehouse/productController';

export const productsRouter = express.Router();

productsRouter.get('/products',getAllProducts)

productsRouter.get('/lowstockproducts',getLowStockProducts)