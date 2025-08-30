import jwt from "jsonwebtoken";

export const authenticateUser = (req:any,res:any,next:any) =>{
    
    try {
        console.log("We reached here")
        const token = req.cookies.token;
        if(!token){
            console.log("Token not found")
            return res.status(401).json({ message: "Unauthorized User" });
        }
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

