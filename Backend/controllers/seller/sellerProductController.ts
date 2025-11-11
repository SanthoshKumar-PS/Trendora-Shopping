import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const viewSellerProducts = async (req:any,res:any) => {
    try{
        const userId=req.id;
        const userEmail=req.email;

        const sellerProducts = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });

        if (sellerProducts.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }
        return res.status(200).json({ message: "Returning all products", products: sellerProducts });
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
            return res.status(400).json({message:"All fields are required"});
        }

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
            }
        })

        return res.status(201).json({message:"Product has been created successfully"})


    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }

}

export const updateProduct = async(req:any,res:any) => {
    try{
        const userId = req.id;

        const {productId,categoryId, productName, productDescription,productFeatures, discountedPrice, actualPrice} = req.body
        if (!productId || !categoryId || !productName || !productDescription || !discountedPrice || !actualPrice ){
            return res.status(400).json({message:"All fields are required"});
        }

        const updateProduct = await prisma.product.update({
            where:{
                id:Number(productId)
            },
            data:{
                name:productName,
                description:productDescription,
                features: productFeatures,
                discountedPrice:discountedPrice,
                actualPrice:actualPrice,
                category: {
                    connect : {id:categoryId}
                },

            }
        })

        return res.status(200).json({message:"Product has been updated successfully"})


    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const getProductDetails = async (req:any, res:any) => {
    try{
        const productId = req.params.productId;
        const product = await prisma.product.findUnique({
            where:{
                id:Number(productId)
            },
            include:{
                category:true
            }
        }) 
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        return res.status(200).json({message:"Success fetching product details",product:product});


    }
    catch(error){
        console.log("Internal Server Error");
        return res.status(500).json({ message: "Internal Server error"});
    }
}