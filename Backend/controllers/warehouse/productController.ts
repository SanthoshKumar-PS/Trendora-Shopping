import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const getAllProducts = async (req:Request,res:Response) => {
    try{
        const allProducts = await prisma.product.findMany({
            include:{
                category:{
                    select:{
                        name:true
                    }
                }
            }
        })
        res.status(200).json({message:"Products fetched", products:allProducts})
        return
    }
    catch(error:any){
        console.log("Error occured while fetchong products",error.message)
        res.status(500).json({message:"Internal Server Error"})
        return
    }
}

export const getLowStockProducts = async (req:Request,res:Response) => {
    try{
        const allProducts = await prisma.product.findMany({
            include:{
                category:{
                    select:{
                        name:true
                    }
                }
            }
        })
        const lowStockProducts = allProducts.filter(
            p => p.quantityInStock <= p.reorderLevel
        );
        res.status(200).json({message:"Products fetched", products:lowStockProducts})
        return
    }
    catch(error:any){
        console.log("Error occured while fetchong products",error.message)
        res.status(500).json({message:"Internal Server Error"})
        return
    }
}

