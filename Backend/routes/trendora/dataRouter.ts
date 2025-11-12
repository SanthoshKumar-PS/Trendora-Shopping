import express from "express";
import { getCategories } from "../../controllers/trendora/dataController";

export const dataRouter = express.Router()

dataRouter.get("/categories",getCategories)