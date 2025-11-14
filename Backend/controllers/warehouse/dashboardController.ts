import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
import { getCurrentWeekRangeIST } from "../../helpers/getCurrentWeekRangeIST";

const prisma = new PrismaClient();

export const getDashboardData = async (req:Request,res:Response) => {
    try{
        const {startOfWeek, endOfToday} = getCurrentWeekRangeIST()
        const [weeklyOrders, weeklyRevenue,outOfStock,processingOrders] = await Promise.all([
            prisma.order.aggregate({
                _count: {orderNo:true},
                where:{
                    createdAt:{
                        gte: startOfWeek,
                        lt:endOfToday
                    }
                }
            }),
            prisma.order.aggregate({
                _sum: { totalAmount:true },
                where:{
                    createdAt: {
                        gte:startOfWeek,
                        lt:endOfToday
                    }
                }
            }),
            prisma.product.aggregate({
                _count: {id:true},
                where:{
                    quantityInStock:0
                }
            }),
            prisma.order.aggregate({
                _count:{orderNo:true},
                where:{
                    status:'PROCESSING'
                }
            })
        ])
        res.status(200).json({message:"Success", cardData:{weeklyOrders:weeklyOrders._count.orderNo||0,weeklyRevenue:weeklyRevenue._sum.totalAmount||0,outOfStock:outOfStock._count.id||0,processingOrders:processingOrders._count.orderNo||0}})
        return;
    } catch(error:any){
        console.log("Error occured while fetching dashboard data: ",error.message);
        res.status(500).json({message:error.message})
    }
}