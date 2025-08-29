import express from "express";
import upload from "../../middleware/uploadMiddleware";
import { uploadImages }  from "../../controllers/seller/uploadController";

const uploadRouter = express.Router();

uploadRouter.post("/uploadProductImages",upload.array('images'),uploadImages)

export default uploadRouter;