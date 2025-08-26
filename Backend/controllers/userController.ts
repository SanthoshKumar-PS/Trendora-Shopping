import { PrismaClient, User } from "@prisma/client"
const prisma=new PrismaClient()
import jwt from"jsonwebtoken"

const generateToken=(email:string)=>{
    return jwt.sign({email},"_secret",{expiresIn:'1h'})
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
            return res.status(409).json({message:"User with same email already exists"})
        }
        
        const createdUser=await prisma.user.create({
            data:{
                email:email,
                name:name,
                password:password,
                role: role
            }
        })

        if(role==='SELLER'){
            const createdStock= await prisma.stock.create({
                data:{
                    sellerId:createdUser.id
                }
            })
        }


        const token=generateToken(email)
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge: 60 * 60 * 1000,
            sameSite:"strict"
        })
        return res.status(201).json({message:"Account created succesfully"})

    }
    catch(error){
        console.log("Error occured while registering user ",error.message)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export const login = async (req:any,res:any) => {
    try {
        const {email,password} = req.body;
        const loggingUser = await prisma.user.findUnique({where:{email:email}})

        if(!loggingUser){
            return res.status(404).json({message:"User not found"})
        }

        if(loggingUser.password!==password){
            return res.status(401).json({message:"Wrong Password. Please Enter Again"})
        }

        const token=generateToken(email)
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge: 60 * 60 * 1000,
            sameSite:"strict"
        })
        return res.status(200).json({message:"Login Successful",role:loggingUser.role})
        
    } 
    catch (error) {
        console.log("Error occured while logging in ",error.message)
        return res.status(500).json({message:"Internal Server Error"})
        
    }
}