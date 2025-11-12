import { PrismaClient, User } from "@prisma/client"
const prisma=new PrismaClient()
import jwt from"jsonwebtoken"

const generateToken=(id:number,email:string)=>{
    return jwt.sign({id,email},"_secret",{expiresIn:'7d'})
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

        const token=generateToken(createdUser.id,createdUser.email)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            // secure:process.env.NODE_ENV==="production",
            maxAge: 7*24* 60 * 60 * 1000,
            sameSite:process.env.NODE_ENV === "production" ? "strict" : "lax",
            path: "/"
        })
        return res.status(201).json({message:"Account created succesfully",role:createdUser.role , name:createdUser.name,cartId:createdUser.cart.id})

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
            maxAge: 7*24*60*60*1000,
            sameSite:process.env.NODE_ENV === "production" ? "strict" : "lax",
            path: "/"
        })
        return res.status(200).json({message:"Login Successful",
            email:loggingUser.email, 
            name:loggingUser.name, 
            role:loggingUser.role, 
            image:loggingUser.image,
            phone:loggingUser.phone,
            cartId:loggingUser.cart.id
        })
    } 
    catch (error) {
        console.log("Error occured while logging in ",error.message)
        return res.status(500).json({message:"Internal Server Error",cartId:null})
        
    }
}

export const logout = async (req:any,res:any) => {
    try{
        const {clearPreviousToken} = req.body
        console.log("Clear old token : ",clearPreviousToken)
        if(clearPreviousToken){
            res.clearCookie("token", {
                httpOnly:true,
                secure:false,
                // secure:process.env.NODE_ENV==="production",
                // maxAge: 7*24*60*60*1000,
                sameSite:process.env.NODE_ENV === "production" ? "strict" : "lax",
                path: "/"
            });
        }

        res.status(200).json({message:"Logged out successfully"})


    }
    catch(error){
        console.log("Error occured while logging out");
        res.status(500).json({message:"Internal Server Error while Logging out"})
    }
}

export const registerOrLogin = async (req:any,res:any) => {
    try {
        const {email,password} = req.body;
        let loggingUser = await prisma.user.findUnique({
            where:{email:email},
            include:{cart:true}
        })

        if(!loggingUser){
            loggingUser= await prisma.user.create({
                data: {
                    email,password,role:"USER",
                    cart:{
                        create:{}
                    }
                },
                include:{cart:true}
            })
            const token=generateToken(loggingUser.id,loggingUser.email)
            res.cookie("token",token,{
                httpOnly:true,
                secure:false,
                // secure:process.env.NODE_ENV==="production",
                maxAge: 7*24*60*60*1000,
                sameSite:process.env.NODE_ENV === "production" ? "strict" : "lax",
                path: "/"
            })
            return res.status(201).json({message:"Signin Successful",
                id:loggingUser.id,
                email:loggingUser.email, 
                name:loggingUser.name, 
                role:loggingUser.role, 
                image:loggingUser.image,
                phone:loggingUser.phone,
                cartId:loggingUser.cart.id
            })        
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
            maxAge: 7*24*60*60*1000,
            sameSite:process.env.NODE_ENV === "production" ? "strict" : "lax",
            path: "/"
        })
        return res.status(200).json({message:"Login Successful",
            email:loggingUser.email, 
            name:loggingUser.name, 
            role:loggingUser.role, 
            image:loggingUser.image,
            phone:loggingUser.phone,
            cartId:loggingUser.cart.id
        })
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
        console.log("New Address created is: ",newAddress)

        return res.status(201).json({message:"New Address Created",address:newAddress})

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({message:"Internal Server Error",address:null});
    }
}

export const updateAddress = async (req:any,res:any) => {
    try{
        console.log("im here macha fix paniduu")
        const userId = req.id;
        const {id,name,phone,line1,line2,city,state,pincode,type} = req.body;
        const updatedAddress = await prisma.address.update({
            where:{
                id:Number(id)
            },
            data:{
                name,phone,line1,line2,city,state,pincode,type
            }
        })
        console.log("Updated address is: ",updatedAddress)
        return res.status(200).json({message:"Address updated Successfully",address:updatedAddress})

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Inernal Server Error",address:null});
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

export const getHomeProducts = async (req:any,res:any)=>{
    try{
        const currentUserId=req.id;
        const pageNo = parseInt(req.query.pageStr as string) || 1;
        const limit = parseInt(req.query.limitStr as string) || 24;
        const fetchedProducts = await prisma.product.findMany({
            skip:(pageNo-1)*limit,
            take:limit,
            include :{
                category:true,
                carts: {
                    where: { userId: currentUserId }, // check only this user’s cart
                    select: { id: true },
                },
            },
            orderBy:{
                createdAt:'desc'
            }
        })

        const response = fetchedProducts.map(p=>({
            ...p,
            isInCart : p.carts.length>0
        }))

        const total = await prisma.product.count();

        return res.status(200).json({message:"Returing 24 products to home page", products :response, nextPage: (pageNo*limit)<total?pageNo+1:null})


    }
    catch(error){
        console.log("Internal Server Error while getting home products")
        return res.status(500).json({message : "Internal Server Error",products:[],nextPage:null})
    }
}

