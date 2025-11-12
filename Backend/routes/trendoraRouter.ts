import express from 'express'
import { dataRouter } from './trendora/dataRouter';
import { productRouter } from './trendora/productRouter';
import { userRouter } from './trendora/userRoutes';
import uploadRouter from './trendora/seller/uploadRouter';
import { sellerProductRouter } from './trendora/seller/sellerProductRouter';
import { dashboardRouter } from './trendora/dashboardRouter';

export const trendoraRouter = express.Router();

trendoraRouter.use("/api", dataRouter);
trendoraRouter.use("/api", productRouter);
trendoraRouter.use("/user", userRouter);

trendoraRouter.use("/seller", uploadRouter);
trendoraRouter.use("/seller", sellerProductRouter);
trendoraRouter.use("/seller", dashboardRouter);