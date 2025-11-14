import express from 'express'
import { apiRouter } from './warehouse/apiRouter';
import { productsRouter } from './warehouse/productsRouter';

export const warehouseRouter = express.Router();

warehouseRouter.use('/api',apiRouter)
warehouseRouter.use('/data', productsRouter)

warehouseRouter.get('/',(req:any,res:any)=>{
    res.send("Hi macha warehouse")
})