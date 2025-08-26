import express from "express";
import upload from "../../middleware/uploadMiddleware";
import { uploadImages } from "../../controllers/seller/uploadController";

const router = express.Router();

router.post("/uploadProductImages",upload.array('images'),uploadImages)

export default router;