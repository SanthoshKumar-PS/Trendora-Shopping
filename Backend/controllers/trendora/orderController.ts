import { OrderStatus, Prisma, PrismaClient } from "@prisma/client";

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
        const {pageNo,limit,search,sort,status} = req.query;
        console.log({pageNo,limit,search,sort,status});
        const normalizedStatus = status?.toUpperCase() as OrderStatus | undefined;
        console.log("normalizedStatus: ",normalizedStatus)

        const skip = (Number(pageNo)-1)*Number(limit);
        if(!userId){
            return res.status(404).json({message:"Unauthorized User Access",orders:[]});
        }
        const whereClause:Prisma.OrderWhereInput = search?
        {
            AND:[
                {userId:userId},
                {
                    OR:[
                        {orderNo : {contains:search,mode:'insensitive'}},
                        // {status: { equals:search.toUpperCase() as OrderStatus}},
                        {address:{
                            OR:[
                                {name: {contains:search,mode:'insensitive'}},
                                {phone: {contains:search,mode:'insensitive'}},
                                {type: {contains:search,mode:'insensitive'}},
                                {line1: {contains:search,mode:'insensitive'}},
                                {line2: {contains:search,mode:'insensitive'}},
                                {city: {contains:search,mode:'insensitive'}},
                                {state: {contains:search,mode:'insensitive'}},
                                {pincode: {contains:search,mode:'insensitive'}},
                            ]
                        }},
                        {orderDetails:{
                            some: {
                                product: {
                                    OR:[
                                        {name: {contains:search,mode:'insensitive'}},
                                        {description: {contains:search,mode:'insensitive'}},
                                    ]
                                }
                            }
                        }}
                    ]
                },
                ...(normalizedStatus ? [{ status: { equals: normalizedStatus } }] : []),
            ]
        } : {
            AND:[
                {userId:userId},
                ...(normalizedStatus ? [{ status: { equals: normalizedStatus } }] : [])
            ]
        };

        const orderByClause: Prisma.OrderOrderByWithRelationInput[] = sort
        ? [
            { totalAmount: sort as "asc" | "desc" },
            { orderDate: "desc" }
            ]
        : [
            { orderDate: "desc" }
        ];

        const allOrders = await prisma.order.findMany({
            where:whereClause,
            take:Number(limit),
            skip,
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
            orderBy:orderByClause
        })
        const totalOrdersCount = await prisma.order.count({
            where:whereClause
        });

        console.log("User orders fetched");
        return res.status(200).json({message:"User orders fetched",orders:allOrders,totalOrdersCount, totalPages:Math.ceil(totalOrdersCount/limit)});

    }
    catch(error){
        console.log("Internal Server Error");
        console.log(error);
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

