import express from "express";
import multer from "multer";
import { verifyAdminToken } from "../middleware/verifyToken";
import { uploadFiles, deleteFile, uploadFile } from "./uploadController";

const router = express.Router();

const upload = multer();

// Route for multiple file uploads
router.post("/multiple", upload.array("file", 10), uploadFiles);
router.post("/postfile", upload.single("file"), uploadFile);
router.delete("/deletefile/:id", verifyAdminToken, deleteFile);

export default router;
