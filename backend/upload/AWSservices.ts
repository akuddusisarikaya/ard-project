import { s3 } from './AWSConfig';

export const uploadFileToAWSS3 = async (file: Express.Multer.File): Promise<string> => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const data = await s3.upload(params).promise();
  return JSON.stringify(data);
};

export const getSignedUrlFromAWSS3File = async (key: string): Promise<string> => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: key,
    Expires: 360,
  };

  const url = s3.getSignedUrl('getObject', params);
  return url;
};