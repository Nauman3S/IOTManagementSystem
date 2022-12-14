import { Request } from "express";
import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";
import multer from "multer";
import multerS3 from "multer-s3";
import Config from "../config";
import { ReadStream } from "fs";

const s3 = new S3({
  apiVersion: "api-v1",
  accessKeyId: Config.AWS_ACCESS_KEY,
  secretAccessKey: Config.AWS_SECRET_KEY,
  region: Config.AWS_BUCKET_REGION,
});
// @ts-ignore
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  cb(
    file.mimetype === "application/octet-stream"
      ? true
      : new Error("Only .bin Files Uploads are accepted")
  );
};

export default multer({
  fileFilter,
  storage: multerS3({
    // @ts-ignore
    s3,
    bucket: Config.AWS_BUCKET_NAME || "uploads",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // @ts-ignore
    metadata: (req: Request, file: Express.Multer.File, cb: any) =>
      cb(null, { fieldName: file.fieldname }),
    key: (req: Request, cb: any) =>
      cb(null, `projects/${req?.body?.title}${Date.now().toString()}`),
  }),
});

//Upload File to S3
export const uploadFile = (file: Express.Multer.File) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams: { Bucket: string; Body: ReadStream; Key: string } = {
    Bucket: Config.AWS_BUCKET_NAME || "bucketName",
    Body: fileStream,
    Key: file.filename + "-" + file.originalname,
  };
  return s3.upload(uploadParams).promise();
};

//Delete File From S3
export const deleteFile = (Key: string) => {
  const deleteOptions: { Bucket: string; Key: string } = {
    Bucket: Config.AWS_BUCKET_NAME || "bucketName",
    Key: Key,
  };
  return s3.deleteObject(deleteOptions).promise();
};
