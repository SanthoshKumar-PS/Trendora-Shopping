import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserCartProducts = async (req:any,res:any) =>{
    try{
        if(!req.id){
            return res.status(401).json({message:"Unauthorized request without id",cartProducts:[]})
        }
        const userId = req.id;
        const userCart = await prisma.cart.findFirst({
            where:{userId:userId},
            include:{products:true}
        })

        if(!userCart){
            console.log("User has no cart. Creating one with no products initially");
            const newCart = await prisma.cart.create({
                data:{userId:userId}
            })
            return res.status(201).json({message:"Created New Cart",cartProducts:[]})
        }

        console.log("Fetched User Cart Products Successfully")
        return res.status(200).json({message:"Returning all cart products if present",cartProducts:userCart.products})

    }
    catch(error){
        console.log(error.message)
        console.log("Error while fetching cart controller");
        return res.status(500).json({message:"Internal Server Error",cartProducts:[]});
    }
}

