import jwt from "jsonwebtoken";

export const authenticateUser = (req:any,res:any,next:any) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: "Unauthorized User" });
    }

    try {
        const decoded = jwt.verify(token,"_secret");
        req.id = decoded.id;        
        req.email = decoded.email;      
        console.log("Aunthentication : ",req.id,req.email)  
        next()
    } 
    catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });    
    }
}

