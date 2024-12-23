import dotenv from "dotenv";
import FormData from "form-data";
import axios from "axios";

dotenv.config();

export const postFileToS3 = async (
  file: Express.Multer.File
): Promise<any> => {
  const project = process.env.PROJECT;
  const bucket = process.env.BUCKET_NAME;
  const accessKey = process.env.ACCESS_KEY;
  const link = process.env.S3SPACE_LINK;

  if (!project || !bucket || !accessKey || !link) {
    throw new Error("Eksik çevre değişkenleri. Lütfen kontrol edin.");
  }
  const form = new FormData()
  form.append("project", project);
  form.append("bucket", bucket);
  form.append("accessKey",accessKey);
  form.append('file', file.buffer, file.originalname);

  try {
    const response = await axios.post(link, form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    return response
  } catch (error) {
    return error;
  }
};

export const deleteFileFromS3 = async (fileID: string): Promise<any> => {
  const project = process.env.PROJECT;
  const bucket = process.env.BUCKET_NAME;
  const accessKey = process.env.ACCESS_KEY;
  const link = process.env.S3SPACE_LINK;
  const path = `${link}/${project}/${bucket}/${accessKey}/${fileID}`;
  try {
    const response = await axios.delete(path)
    return JSON.stringify(response);
  } catch (error) {
    return error;
  }
};
