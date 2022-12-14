"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mqtt_controller_1 = require("../controllers/mqtt.controller");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    dest: "uploads/",
    limits: { fieldSize: 25 * 1024 * 1024 },
});
const router = (0, express_1.Router)();
// postToMqtt();
// postLogsToMqtt();
/**
 * Publish data to Mqtt
 */
router.post("/publish", upload.single("file"), mqtt_controller_1.publishToMqtt);
/**
 * Get Data By MacAdress
 * @params - {macAddress} - {string}
 */
router.post("/data", mqtt_controller_1.getDataByMacAddress);
/**
 * @body
 * file - Express.Multer.File
 */
router.post("/file/upload", upload.single("file"), mqtt_controller_1.uploadFileToS3);
/**
 * @body
 * delete file
 * key - string
 */
router.delete("/file/delete/:key", mqtt_controller_1.deleteFileFromS3);
/**
 * Get All Files
 */
router.post("/files", mqtt_controller_1.getAllFiles);
exports.default = router;
