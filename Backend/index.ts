import express from "express";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true // allows sending cookies
}));

app.use("/user",userRouter)

app.get('/', async (__dirname,res)=>{
    res.send("Welcome Boss")
    console.log("Hi Santhosh , you are ready to go")
})


app.listen(4000, () => {
  console.log("Server running on port 4000");
});