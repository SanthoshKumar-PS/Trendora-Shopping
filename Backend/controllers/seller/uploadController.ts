import {Request, Response} from "express"
import cloudinary from "../../config/cloudinary"

export const uploadImages = async (req:Request, res:Response)=>{
    try{
        const {sellerName,productName}=req.body;
        const files = req.files as Express.Multer.File[];
        if(!files || files.length===0){
            return res.status(400).json({message:"No Files Uploaded"});
        }

        const uploadPromises = req.files.map((file:any)=>{
            cloudinary.uploader.upload(file.path,{
                folder: `${sellerName}/${productName}`,
                resource_type:"image",
            })
        })

        const results= await Promise.all(uploadPromises)
        const urls=results.map((r)=>r.secure_url);
        res.status(200).json({message:"Images Uploaded Successfully",urls:urls})

    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:"Internal Server Error"});

    }
}