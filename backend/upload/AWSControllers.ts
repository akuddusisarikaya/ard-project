import { Request, Response } from "express";
import { getSignedUrlFromAWSS3File, uploadFileToAWSS3 } from "./AWSservices";
import Doc from "../models/doc";

export const uploadFileToAWS = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "File is required" });
      return;
    }

    const { describe } = req.body;
    const description = describe && describe !== "undefined" ? describe : "Açıklama yok";

    const fileUrl = await uploadFileToAWSS3(req.file);
    const uploadedFile = JSON.parse(fileUrl)
    const fileURL = uploadedFile.Location; 
    const fileKey = uploadedFile.Key
    
    const docBody = {
        doc_name : fileKey,
        doc_url : fileURL,
        describe : description,
    }

    const data = new Doc(docBody);
    const answer = await data.save();

    res.status(200).json({ message: "File uploaded successfully", answer });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Error uploading file", error });
  }
};


export const getSignedFileUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const { key } = req.params;
      const signedUrl = await getSignedUrlFromAWSS3File(key);
      res.status(200).json({ signedUrl });
    } catch (error) {
      res.status(500).json({ message: 'Error generating signed URL', error });
    }
  };