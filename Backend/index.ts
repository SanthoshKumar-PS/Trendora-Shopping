import express from "express";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import { trendoraRouter } from "./routes/trendoraRouter";
import { warehouseRouter } from "./routes/warehouseRouter";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:5173", // frontend URL,
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allows sending cookies
  })
);

app.use('/trendora',trendoraRouter)
app.use('/warehouse',warehouseRouter)

app.get("/", async (__dirname, res) => {
  res.send("Welcome Boss");
  console.log("Hi Santhosh , you are ready to go");
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
