import express from 'express'

export const warehouseRouter = express.Router();

warehouseRouter.get('/',(req:any,res:any)=>{
    res.send("Hi macha warehouse")
})