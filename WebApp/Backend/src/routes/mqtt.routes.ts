import { Router } from "express";
import {
  publishToMqtt,
  getDataByMacAddress,
  getAllFiles,
  uploadFileToS3,
  deleteFileFromS3,
} from "../controllers/mqtt.controller";

import multer from "multer";
const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const router: Router = Router();

// postToMqtt();
// postLogsToMqtt();
/**
 * Publish data to Mqtt
 */
router.post("/publish", upload.single("file"), publishToMqtt);

/**
 * Get Data By MacAdress
 * @params - {macAddress} - {string}
 */
router.post("/data", getDataByMacAddress);

/**
 * @body
 * file - Express.Multer.File
 */
router.post("/file/upload", upload.single("file"), uploadFileToS3);

/**
 * @body
 * delete file
 * key - string
 */
router.delete("/file/delete/:key", deleteFileFromS3);

/**
 * Get All Files
 */
router.post("/files", getAllFiles);

export default router;
