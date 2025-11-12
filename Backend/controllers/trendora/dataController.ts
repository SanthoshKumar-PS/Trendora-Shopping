import {Request, Response} from "express"
import { PrismaClient } from "@prisma/client";
const prisma= new PrismaClient();

export const getCategories = async (req:any,res:any) =>{
    try{
        const categories = await prisma.category.findMany({
            where:{
                children:{none:{}}
            }
        })

        if(!categories){
            return res.status(404).json({message:"No categories found"});
        }
        // console.log(categories)
        return res.status(200).json({ message: "Categories fetched successfully", categories: categories });


    }
    catch{
        console.log("Error has occred while fetching categories")
        return res.status(500).json({message:"Internal Server Error"})
    }

}