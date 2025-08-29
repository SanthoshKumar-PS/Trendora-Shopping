import express from "express";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import uploadRouter from "./routes/seller/uploadRouter";
import { dataRouter } from "./routes/dataRouter";
import { productRouter } from "./routes/seller/productRouter";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true // allows sending cookies
}));

app.use("/api",dataRouter)
app.use("/user",userRouter)

app.use("/seller",uploadRouter)
app.use("/seller",productRouter)


app.get('/', async (__dirname,res)=>{
    res.send("Welcome Boss")
    console.log("Hi Santhosh , you are ready to go")
})


app.listen(4000, () => {
  console.log("Server running on port 4000");
});