import { PrismaClient, User } from "@prisma/client"
const prisma=new PrismaClient()
import jwt from"jsonwebtoken"

const generateToken=(id:number,email:string)=>{
    return jwt.sign({id,email},"_secret",{expiresIn:'1h'})
}

export const register= async (req:any,res:any)=>{
    try{
        const {name,email,password,role} = req.body;
        
        const user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(user){
            return res.status(409).json({message:"User with same email already exists",cartId:null})
        }
        
        const createdUser=await prisma.user.create({
            data:{
                email:email,
                name:name,
                password:password,
                role: role,
                cart:{create:{}}
            },
            include:{cart:true}
        })

        if(role==='SELLER'){
            const createdStock= await prisma.stock.create({
                data:{
                    sellerId:createdUser.id
                }
            })
        }


        const token=generateToken(createdUser.id,createdUser.email)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            // secure:process.env.NODE_ENV==="production",
            maxAge: 7*24* 60 * 60 * 1000,
            sameSite:process.env.NODE_ENV === "production" ? "strict" : "lax"
        })
        return res.status(201).json({message:"Account created succesfully",cartId:createdUser.cart.id})

    }
    catch(error){
        console.log("Error occured while registering user ",error.message)
        return res.status(500).json({message:"Internal Server Error",cartId:null})
    }
}

export const login = async (req:any,res:any) => {
    try {
        const {email,password} = req.body;
        let loggingUser = await prisma.user.findUnique({
            where:{email:email},
            include:{cart:true}
        })

        if(!loggingUser){
            return res.status(404).json({message:"User not found",cartId:null})
        }

        if(loggingUser.password!==password){
            return res.status(401).json({message:"Wrong Password. Please Enter Again",cartId:null})
        }
        
        if (!loggingUser.cart) {
        const newCart = await prisma.cart.create({
            data: { userId: loggingUser.id },
        });
        loggingUser = { ...loggingUser, cart: newCart };
        }

        const token=generateToken(loggingUser.id,loggingUser.email)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            // secure:process.env.NODE_ENV==="production",
            maxAge: 7*24*60 * 60 * 1000,
            sameSite:process.env.NODE_ENV === "production" ? "strict" : "lax"
        })
        return res.status(200).json({message:"Login Successful",role:loggingUser.role, name:loggingUser.name,cartId:loggingUser.cart.id})
        
    } 
    catch (error) {
        console.log("Error occured while logging in ",error.message)
        return res.status(500).json({message:"Internal Server Error",cartId:null})
        
    }
}

export const addAddress = async (req:any,res:any) =>{
    try{
        const userId = req.id;
        const {name,phone,line1,line2,city,state,pincode,type} = req.body;
        const newAddress = await prisma.address.create({
            data:{
                user_id:Number(userId),
                name,
                phone,
                line1,
                line2,
                city,
                state,
                pincode,
                type
            }
        })

        return res.status(201).json({message:"New Address Created",address:newAddress})

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const getAllAddresses = async (req:any,res:any)=>{
    try{
        const userId = req.id

        if (!userId) {
        return res.status(400).json({ message: "User ID missing in request" ,addresses:[]});
        }

        const allAddresses = await prisma.address.findMany({
            where:{
                user_id:userId
            }
        })

        return res.status(200).json({message:"Fetched all addresses of the user",addresses:allAddresses})
        
        
    }
    catch(error){
        console.log(error)
        console.log("Error occured while fetching all addresses");
        return res.status(500).json({message:"Internal Server Error",addresses:[]})
    }
}