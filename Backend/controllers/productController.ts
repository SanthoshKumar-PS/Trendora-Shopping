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
        const {productCategory} = req.query;

        const productsByCategory = await prisma.product.findMany({
            where: {categoryId:productCategory}
        })

        //console.log(productsByCategory)
        return res.status(200).json({message:"Successfully fetched all products in category",products:productsByCategory})

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error",products:[]})
    }
}