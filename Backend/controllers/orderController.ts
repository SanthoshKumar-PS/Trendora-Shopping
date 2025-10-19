import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateOrderNo(): string {
    const timePart = (Date.now() % 1000).toString().padStart(3, "0");        
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `TRD-${timePart}${randomPart}`;
}
    
export const placeOrder =  async (req:any,res:any) => {
    try{
        const userId = req.id;
        const {deliveryAddressId, grandTotalDiscountedPrice, grandTotalActualPrice, products} = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            console.log("No products selected for order.")
            return res.status(400).json({ message: "No products selected for order." });
        }

        if (!deliveryAddressId) {
            console.log("Delivery address is required.")
            return res.status(400).json({ message: "Delivery address is required." });
        }

        const result = await prisma.$transaction(async (tx) => {
            const placedOrder = await tx.order.create({
                data:{
                    userId:userId,
                    orderNo:generateOrderNo(),
                    totalAmount:grandTotalDiscountedPrice,
                    totalActualAmount:grandTotalActualPrice,
                    paymentMethod:"UPI", //NotOK
                    paymentStatus:"COMPLETED", //NotOK
                    deliveryAddressId:deliveryAddressId, 
                    deliveryCharges:0 //NotOk

                }
            })
            const placedProductDetails = await Promise.all(
                products.map(product=>
                    tx.orderDetails.create({
                        data: {
                            orderId : placedOrder.id,
                            productId:product.product.id, 
                            actualPrice:product.product.actualPrice, 
                            discountedPrice:product.product.discountedPrice, 
                            quantity:product.quantity, 
                            totalPrice:product.totalDiscountedPrice
                        }
                    })
                )
            );
            return {placedOrder,placedProductDetails}
        });

        console.log("Order : ",result.placedOrder)
        console.log("Order Details: ",result.placedProductDetails)
        if(!result.placedOrder || !result.placedProductDetails){
            return res.status(400).json({message:"Order could not be placed. Please try again."})
        }
        return res.status(200).json({message:"Your order has been placed successfully",orderNo:result.placedOrder.orderNo});

    }
    catch(error){
        console.log("Internal Server Error");
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const getAllOrders = async (req:any,res:any) => {
    try{
        const userId = req.id;
        if(!userId){
            return res.status(404).json({message:"Unauthorized User Access",orders:[]});
        }

        const allOrders = await prisma.order.findMany({
            where:{userId:userId},
            include:{
                address:{
                    select:{
                        name : true,
                        city : true
                    },
                },
                _count:{
                    select: { orderDetails:true }
                },
                orderDetails:{
                    take:1,
                    include:{
                        product:{
                            select:{
                                name:true,
                                images:true
                            }
                        }
                    }
                }
            },
            orderBy:{
                orderDate:'desc'
            }
        })

        console.log("User orders fetched");
        return res.status(200).json({message:"User orders fetched",orders:allOrders});

    }
    catch(error){
        console.log("Internal Server Error");
        res.status(500).json({message:"Internal Server Error",orders:[]});
    }
}

export const getOrderDetails = async (req:any, res:any) => {
    try{
        const userId = req.id;
        const orderId = req.params.id;
        if(!userId || !orderId){
            return res.status(400).json({message:"Missing orderId or userId",order:null});
        }
        const orderDetail = await prisma.order.findUnique({
            where:{
                // userId:userId,
                orderNo:orderId
            },
            include:{
                user:true,
                orderDetails:{
                    include:{
                        product:true
                    }
                },
                address:true
            }
        })

        return res.status(200).json({message:`${orderId} Details Fetched Successfully.`,order:orderDetail})

    }
    catch(error){
        console.log("Internal Server Error");
        return res.status(500).json({message:"Internal Server Error",order:null})
    }
}

export const getPdfOrder = async (req:any, res:any) => {
    try{
        const userId = req.id;
        const orderId = req.params.id;
        if(!userId || !orderId){
            return res.status(400).json({message:"Missing orderId or userId",order:null});
        }
        const orderDetail = await prisma.order.findUnique({
            where:{
                userId:userId,
                orderNo:orderId
            },
            include:{
                user:true,
                orderDetails:{
                    include:{
                        product:true
                    }
                },
                address:true
            }
        })

        return res.status(200).json({message:`${orderId} Details Fetched Successfully.`,order:orderDetail})

    }
    catch(error){
        console.log("Internal Server Error");
        return res.status(500).json({message:"Internal Server Error",order:null})
    }
}

