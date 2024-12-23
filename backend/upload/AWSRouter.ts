import express from "express";
import multer from "multer";
import { uploadFileToAWS, getSignedFileUrl} from "./AWSControllers"

const upload = multer();

const router = express.Router();

router.post('/aws/upload', upload.single('file'), uploadFileToAWS);
router.get('/aws/geturl', getSignedFileUrl);

export default router