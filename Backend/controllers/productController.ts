import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProductDetailsById = async (req:any,res:any)=>{
    try {
        const {productId} = req.query;
        const productDetail = await prisma.product.findUnique({
            where : { id:Number(productId) }
        })
        console.log(productDetail)

        return res.status(200).json({message:"Data fetched successfully", product:productDetail})
    } 
    catch (error) {
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error", product:null});        
    }
} 

export const getRecommendedProducts = async (req:any, res:any)=>{
    try{
        const {productId, productCategory,pageStr,limitStr} = req.query;
        const page = Number(pageStr)
        const limit = Number(limitStr)

        const productIdNum=Number(productId)
        const categoryId = Number(productCategory)
        console.log(productCategory)

        const category = await prisma.category.findUnique({
            where: { id: categoryId },
            include: { parent: true, children: true }, 
        });

        let categoryIds: number[] = [];
        let isParentCategory = !category?.parentId; // true if no parent exists

        if (isParentCategory) {
            // Case 1: Category itself is a parent (like Electronics)
            // include its own id + all its children's ids
            categoryIds = [
            categoryId,
            ...category.children.map((child) => child.id),
            ];
        } else {
            // Case 2: Category has parent (like Mobiles under Electronics)
            // include all siblings under the same parent(Electronics)
            const siblings = await prisma.category.findMany({
            where: { parentId: category.parentId },
            select: { id: true },
            });
            categoryIds = siblings.map((c) => c.id);
        }

        const skip = (page - 1) * limit;

        const products = await prisma.product.findMany({
            where: {
            categoryId: { in: categoryIds },
            id: {not:productIdNum}
            },
            orderBy: { createdAt: "desc" }, // optional
            skip,
            take: limit,
            include: {
            category: true,
            },
        });

        const totalProducts = await prisma.product.count({
            where: {
            categoryId: { in: categoryIds },
            },
        });

        return res.status(200).json({message:"Successfully fetched all products in category",products:products,totalPages: Math.ceil(totalProducts / limit), currentPage: page,})

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error",products:[]})
    }
}