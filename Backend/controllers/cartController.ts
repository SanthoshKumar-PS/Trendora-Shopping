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

export const addProductToCart = async (req:any,res:any) =>{
    try{
        if(!req.id){
            return res.status(401).json({message:"Unauthorized without req id",products:null});
        }
        const userId = req.id;
        const {cartId, productId} = req.body;
        if(!cartId &&!productId){
            return res.status(400).json({message:"Bad request - CartId and ProductId required"})
        }

        const updatedCart = await prisma.cart.update({
            where: {userId:userId},
            data:{
                products:
                    {connect: {id:productId}}
            },
            include:{products:true}
        })
        return res.status(201).json({ message: "Product added to cart", products: updatedCart.products });


    }
    catch(error){
        console.log("Error occured while adding Product to Cart")
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error",product:null})
    }
}

export const deleteProductFromCart = async (req:any,res:any) => {
    try{
        if(!req.id){
            return res.status(401).json({message:"Unauthorized request without id"});
        }
        
        const userId = req.id;
        const {cartId, productId} = req.body;
        if(!cartId &&!productId){
            return res.status(400).json({message:"Bad request - CartId and ProductId required"})
        }
        
        const deletedCart = await prisma.cart.update({
            where:{userId:userId},
            data:{
                products:{
                    disconnect:{id:productId}
                }
            },
            include:{
                products:true
            }
        })
        
        return res.status(200).json({message:"Product has been deleted from cart"});

    }
    catch(error){
        console.log("Error while deleting product");
        console.log(error.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
}