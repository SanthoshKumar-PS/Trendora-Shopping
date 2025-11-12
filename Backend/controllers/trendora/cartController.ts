import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUserCart = async ({userId}:{userId:number}) =>{
    return await prisma.cart.create({
        data:{userId:userId}
    })
}

export const getUserCartProducts = async (req:any,res:any) =>{
    try{
        if(!req.id){
            return res.status(401).json({message:"Unauthorized request without id",cartId:null,cartProducts:[]})
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
            return res.status(201).json({message:"Created New Cart",cartId:newCart.id,cartProducts:[]})
        }

        console.log("Fetched User Cart Products Successfully")
        return res.status(200).json({message:"Returning all cart products if present",cartId:userCart.id ,cartProducts:userCart.products})

    }
    catch(error){
        console.log(error.message)
        console.log("Error while fetching cart controller");
        return res.status(500).json({message:"Internal Server Error", cartId:null, cartProducts:[]});
    }
}

export const addProductToCart = async (req:any,res:any) =>{
    try{
        if(!req.id){
            return res.status(401).json({message:"Unauthorized without req id",cartId:null,products:[]});
        }
        const userId = req.id;
        const {cartId, productId} = req.body;
        if(!cartId &&!productId){
            console.log(cartId,productId)
            return res.status(400).json({message:"Bad request - CartId and ProductId required",cartId:null,products:[]})
        }

        const updatedCart = await prisma.cart.update({
            where: {userId:userId},
            data:{
                products:
                    {connect: {id:productId}}
            },
            include:{products:true}
        })
        return res.status(201).json({ message: "Product added to cart",cartId:updatedCart.id, products: updatedCart.products });


    }
    catch(error){
        console.log("Error occured while adding Product to Cart")
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error", cartId:null,product:[]})
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

export const clearCart = async (req:any,res:any) => {
    try{
        if(!req.id){
            return res.status(401).json({message:"Unauthorized request without id"});
        }
        const userId = req.id;
        const {cartId} = req.body;
        if(!cartId){
            return res.status(400).json({message:"Bad request - CartId required"})
        }

        const userCart = await prisma.cart.findUnique({
            where:{userId}
        })

        if(!userCart){
            return res.status(404).json({ message: "Cart not found" });
        }

        const clearCart = await prisma.cart.update({
            where:{userId:userId},
            data:{
                products: {set:[]}
            }
        })
        return res.status(200).json({message:"Cart cleared successfully"});

    }
    catch(error){
        console.log("Error occured while clearing cart products");
        return res.status(500).json({message:"Internal Server Error"});
    }
}