import express from 'express'
import { getAllProducts, getLowStockProducts,getStockProductsOverview, getRecentOrder, updateProductById } from '../../controllers/warehouse/productController';

export const productsRouter = express.Router();

productsRouter.get('/products',getAllProducts)

productsRouter.patch('/product',updateProductById);

productsRouter.get('/lowstockproducts',getLowStockProducts)

productsRouter.get('/stockproductsoverview',getStockProductsOverview)

productsRouter.get('/orders',getRecentOrder)