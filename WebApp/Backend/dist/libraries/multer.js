"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.uploadFile = void 0;
const s3_js_1 = __importDefault(require("aws-sdk/clients/s3.js"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const config_1 = __importDefault(require("../config"));
const s3 = new s3_js_1.default({
    apiVersion: "api-v1",
    accessKeyId: config_1.default.AWS_ACCESS_KEY,
    secretAccessKey: config_1.default.AWS_SECRET_KEY,
    region: config_1.default.AWS_BUCKET_REGION,
});
// @ts-ignore
const fileFilter = (req, file, cb) => {
    cb(file.mimetype === "application/octet-stream"
        ? true
        : new Error("Only .bin Files Uploads are accepted"));
};
exports.default = (0, multer_1.default)({
    fileFilter,
    storage: (0, multer_s3_1.default)({
        // @ts-ignore
        s3,
        bucket: config_1.default.AWS_BUCKET_NAME || "uploads",
        acl: "public-read",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        // @ts-ignore
        metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
        key: (req, cb) => { var _a; return cb(null, `projects/${(_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title}${Date.now().toString()}`); },
    }),
});
//Upload File to S3
const uploadFile = (file) => {
    const fileStream = fs_1.default.createReadStream(file.path);
    const uploadParams = {
        Bucket: config_1.default.AWS_BUCKET_NAME || "bucketName",
        Body: fileStream,
        Key: file.filename + "-" + file.originalname,
    };
    return s3.upload(uploadParams).promise();
};
exports.uploadFile = uploadFile;
//Delete File From S3
const deleteFile = (Key) => {
    const deleteOptions = {
        Bucket: config_1.default.AWS_BUCKET_NAME || "bucketName",
        Key: Key,
    };
    return s3.deleteObject(deleteOptions).promise();
};
exports.deleteFile = deleteFile;
