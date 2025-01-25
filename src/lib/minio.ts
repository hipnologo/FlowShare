import { Client } from 'minio';
import { v4 as uuidv4 } from 'uuid';

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'minio.sagacity.digital',
  port: Number(process.env.MINIO_PORT) || 443,
  useSSL: process.env.MINIO_USE_SSL !== 'false',
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || ''
});

const BUCKET_NAME = 'flowshare';

export const uploadFile = async (file: File): Promise<string> => {
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  
  await minioClient.putObject(
    BUCKET_NAME,
    fileName,
    await file.arrayBuffer(),
    file.size,
    { 'Content-Type': file.type }
  );

  return fileName;
};

export const getFileUrl = async (fileName: string): Promise<string> => {
  return await minioClient.presignedGetObject(BUCKET_NAME, fileName, 24 * 60 * 60); // 24 hours expiry
};

export const deleteFile = async (fileName: string): Promise<void> => {
  await minioClient.removeObject(BUCKET_NAME, fileName);
};
