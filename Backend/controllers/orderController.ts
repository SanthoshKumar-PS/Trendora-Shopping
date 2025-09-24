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
        const result = await prisma.$transaction(async (tx) => {
            const placedOrder = await tx.order.create({
                data:{
                    userId:userId,
                    orderNo:generateOrderNo(),
                    totalAmount:grandTotalDiscountedPrice,
                    paymentMethod:"UPI", //NotOK
                    paymentStatus:"COMPLETED", //NotOK
                    deliveryAddressId:deliveryAddressId, 
                    deliveryCharges:0 //NotOk

                }
            })
            const placedProductDetails = await Promise.all(
                products.map(product=>{
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
                })
            );
            return {placedOrder,placedProductDetails}
        });

        console.log(result.placedOrder)
        console.log(result.placedProductDetails)
        if(!result.placedOrder || !result.placedProductDetails){
            return res.status(400).json({message:"Order could not be placed. Please try again."})
        }
        return res.status(200).json({message:"Your order has been placed successfully"});

    }
    catch(error){
        console.log("Internal Server Error");
        return res.status(500).json({message:"Internal Server Error"});
    }
}

