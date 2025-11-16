import { OrderStatus, Prisma, PrismaClient } from "@prisma/client"
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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const skip = (page-1)*limit;
        const search = req.query.search ? String(req.query.search) : "";
        let activeStatus = req.query.activeStatus;
        if(Array.isArray(activeStatus)){
            activeStatus = activeStatus[0];
        }
        if(activeStatus==='all' || !activeStatus){
            activeStatus=undefined;
        }

        const whereClause: Prisma.OrderWhereInput = {
            AND:[
                search?{
                    OR : [
                        {orderNo : {contains:search, mode:"insensitive"}},
                        {paymentMethod: {contains: search, mode:"insensitive"}},
                        {paymentStatus: {contains: search, mode:"insensitive"}},
                        {user:{
                                OR: [
                                    {email: {contains: search, mode:"insensitive"}},
                                    {name : {contains:search, mode:"insensitive"}},
                                    {phone: {contains:search, mode:"insensitive"}}
                                ]
                            }
                        },
                        {orderDetails:{
                            some:{
                                product:{
                                    OR:[
                                        {name: {contains: search, mode:"insensitive"}},
                                        {description: {contains: search, mode:"insensitive"}}
                                    ]
                                }
                            }
                        }}
                    ]
                }:{},
                activeStatus?{
                    status: {equals:activeStatus as OrderStatus}
                }:{}
            ]
        }

        const allOrders = await prisma.order.findMany({
            take:limit,
            skip: skip,
            where:whereClause,
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
        const totalOrdersCount = await prisma.order.count({ where: {
            AND : [
                whereClause,
                {
                    status: {
                        in: ['CONFIRMED', 'PROCESSING', 'PROCESSED', 'SHIPPED']
                    }
                }
            ]
        } });

        const statusCount = await prisma.order.groupBy({
            // where:whereClause,
            by:["status"],
            _count:{
                id:true
            }
        })
        console.log("All status: ",statusCount, totalOrdersCount)
        const counts = {
            CONFIRMED: 0,
            PROCESSING: 0,
            PROCESSED: 0,
            SHIPPED: 0
        };
        statusCount.map(row=>{
            if(row.status==='CONFIRMED') counts.CONFIRMED = row._count.id;
            if(row.status==='PROCESSING') counts.PROCESSING = row._count.id;
            if(row.status==='PROCESSED') counts.PROCESSED = row._count.id;
            if(row.status==='SHIPPED') counts.SHIPPED = row._count.id;
        })
        console.log(counts)

        res.status(200).json({message:"Products fetched", orders:allOrders, counts, totalPages: Math.ceil(totalOrdersCount/limit), currentPage:page})
        return
    }
    catch(error:any){
        console.log("Error occured while fetchong products",error.message)
        res.status(500).json({message:"Internal Server Error"})
        return
    }
}

