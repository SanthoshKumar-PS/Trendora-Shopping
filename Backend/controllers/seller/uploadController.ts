import {Request, RequestHandler, Response} from "express"
import cloudinary from "../../config/cloudinary"


export const uploadImages : RequestHandler = async (req:Request, res:Response)=>{
    try{
        const {sellerName,productName}=req.body;
        const files = req.files as Express.Multer.File[];
        if(!files || files.length===0){
            res.status(400).json({message:"No Files Uploaded"});
            return 
        }

        const uploadPromises = files.map((file:any)=>
            cloudinary.uploader.upload(file.path,{
                folder: `Trendora/${sellerName}/${productName}`,
                resource_type:"image",
            })
        );

        const results= await Promise.all(uploadPromises)
        const urls=results.map((r)=>r.secure_url);
        res.status(200).json({message:"Images Uploaded Successfully",urls:urls})

    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:"Internal Server Error"});

    }
}