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

export const getStockProductsOverview = async (req:Request,res:Response) => {
    try{
        const allProducts = await prisma.product.findMany({
            include:{
                category:{
                    select:{
                        name:true
                    }
                }
            },
            orderBy:{
                updatedAt:'desc'
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

export const getRecentOrder = async (req:Request,res:Response) => {
    try{
        const allOrders = await prisma.order.findMany({
            take:20,
            skip:0,
            include:{
                orderDetails:{
                    include:{
                        product:{
                            select:{
                                id:true,
                                name:true
                            }
                        }
                    }
                },
                user:{
                    select:{
                        name:true,
                        email:true
                    }
                },
                address:{
                    select:{
                        city:true
                    }
                }
            },
            orderBy:{
                updatedAt:'desc'
            }
        })
        const placedCount = await prisma.order.aggregate({
            _count: {
                id:true
            },
            where: {
                status:'CONFIRMED'
            }
        })

        const processingCount = await prisma.order.aggregate({
            _count:{
                id:true
            },
            where: {
                status: 'PROCESSING'
            }
        })

        const processedCount = await prisma.order.aggregate({
            _count:{
                id:true
            },
            where: {
                status: 'PROCESSED'
            }
        })

        res.status(200).json({message:"Products fetched", products:allOrders})
        return
    }
    catch(error:any){
        console.log("Error occured while fetchong products",error.message)
        res.status(500).json({message:"Internal Server Error"})
        return
    }
}

