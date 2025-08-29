import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const viewSellerProducts = async (req:any,res:any) => {
    try{
        const userId=req.id;
        const userEmail=req.email;

        const userStock = await prisma.stock.findUnique({
            where : {sellerId:userId}
        })
        if(!userStock){
            return res.status(404).json({message:"There is no stock for this user"})
        }

        const sellerProducts = await prisma.product.findMany({
            where : {stockId : userStock.id}
        }) 

        console.log("User Products : ", sellerProducts)
        return res.status(200).json({message:"Returing all products to the seller", products : sellerProducts})


    }
    catch{
        console.log("Error occured in Seller View Product")
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const addProduct = async (req:any,res:any) => {
    try{
        const userId = req.id;
        const userEmail = req.email

        const {categoryId, productName, productDescription,productFeatures, discountedPrice, actualPrice, imageUrls} = req.body
        if (!categoryId || !productName || !productDescription || !discountedPrice || !actualPrice || !imageUrls){
            // console.log(categoryId ,productName ,productDescription ,discountedPrice ,actualPrice,imageUrls)
            console.log("400 error is here")
            return res.status(400).json({message:"All fields are required"});
        }

        const userStock=await prisma.stock.findUnique({
            where: {sellerId:userId}
        })

        const newProduct = await prisma.product.create({
            data:{
                name:productName,
                description:productDescription,
                features: productFeatures,
                discountedPrice:discountedPrice,
                actualPrice:actualPrice,
                images: { set: imageUrls},
                category: {
                    connect : {id:categoryId}
                },
                stock:{
                    connect:{id:userStock.id}
                }
            }
        })

        return res.status(201).json({message:"Product has been created successfully"})


    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }

}