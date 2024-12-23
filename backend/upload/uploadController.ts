import { Request, Response } from "express";
import { postFileToS3, deleteFileFromS3 } from "./s3config";
import Doc from "../models/doc";

export const uploadFiles = async (
  req: Request,
  res: Response
): Promise<void> => {
  var description : string;
  const describe = req.body.describe;
  if(!describe || describe === undefined || describe === "undefined" ){
    description = "Açıklama yok";
  }else {
    description = describe;
  }
  if (!req.files || !Array.isArray(req.files)) {
    res.status(400).json({ message: "Dosyalar yüklenemedi. Lütfen dosya gönderin." });
    return;
  }
  const files = req.files as Express.Multer.File[];

  try {
    const uploadedFiles = [];
    const loadedFiles = [];

    for (const file of files) {
      const result = await postFileToS3(file);
      uploadedFiles.push(result);
    }

    for (const loadedFile of uploadedFiles){
      const fileName = JSON.stringify(loadedFile.files[0]?.filePath).split("/").pop();
      const fileID = loadedFile.files[0]?.fileId;
      const fileURL = loadedFile.files[0]?.url;
      const docBody = {
        doc_name: fileName,
        doc_id : fileID,
        doc_url : fileURL,
        describe : description,
      }

      const data = new Doc(docBody);
      const loadData = await data.save();
      loadedFiles.push(loadData);
    }

    res.status(200).json({message: "Dosyalar başarıyla yüklendi.",files: loadedFiles,});
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Dosyalar yüklenirken hata oluştu.", error });
  }
};

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "Dosya yüklenemedi. Lütfen bir dosya gönderin." });
    return;
  }

  const { describe } = req.body;
  const description = describe && describe !== "undefined" ? describe : "Açıklama yok";

  const file: Express.Multer.File = req.file;

  try {
    const response = await postFileToS3(file);
    const resData = response.data
    if (!resData || !resData.files || !resData.files[0]) {
      throw new Error("S3 yükleme yanıtı geçersiz.");
    }

    const docPath = resData.files[0]?.filePath.split('/').pop();
    const docID = resData.files[0]?.fileId;
    const docURL = resData.files[0]?.url;
    const resMessage = resData.message;

    const newBody = {
      doc_name: docPath,
      doc_id: docID,
      doc_url: docURL,
      describe: description,
    };

    const data = new Doc(newBody);
    const answer = await data.save();

    res.status(200).json({ message: resMessage, answer });
  } catch (error) {
    res.status(500).json({
      message: "Dosya yüklenemedi.",
      error: error instanceof Error ? error.message : error,
    });
  }
};


export const deleteFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const doc = await Doc.findById(id)
  if(!doc){
    res.status(404).json({message : "Böyle bir döküman bulunamadı"});
    return;
  }
  const fileID = doc?.doc_id;
  try {
    await Doc.findByIdAndDelete(id);
    const s3mes = await deleteFileFromS3(fileID);
    res.status(200).json({message: "Döküman silindi"});
  } catch (error) {
    res.status(500).json({ message: "Döküman silinemedi", error });
  }
};
