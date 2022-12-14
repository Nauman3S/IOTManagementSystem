"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFiles = exports.deleteFileFromS3 = exports.uploadFileToS3 = exports.getDataByMacAddress = exports.publishToMqtt = exports.postToMqtt = void 0;
const models_1 = require("../models");
const mqtt_1 = require("../libraries/mqtt");
const multer_1 = require("../libraries/multer");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const mqttClient = (0, mqtt_1.connect)();
/**
 * Data from Mqtt
 */
//@ts-ignore
const postToMqtt = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mqttClient.on("message", (topic, payload) => __awaiter(void 0, void 0, void 0, function* () {
            let message = JSON.parse(payload);
            console.log("Received Message:", topic, message);
            if (topic.includes("/logs")) {
                socket.emit("send_message", payload.toString());
                return;
            }
            yield models_1.Mqtt.findOneAndUpdate({ macAddress: message.macAddress }, { macAddress: message.macAddress, status: message.status }, { upsert: true });
        }));
        console.log("Data Saved");
    }
    catch (error) {
        console.log(error);
    }
});
exports.postToMqtt = postToMqtt;
/**
 *
 * Publish Data to MQtt
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const publishToMqtt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const topic = `iotm-sys/device/${req === null || req === void 0 ? void 0 : req.body.endPoint}`;
        mqttClient.publish(topic, (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.message, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error);
            }
        });
        return res.status(200).json({ message: "Data Published" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.publishToMqtt = publishToMqtt;
/**
 * Get Data By MacAdress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getDataByMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.Mqtt.find(req.body.query);
        return res.status(200).json({ data });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getDataByMacAddress = getDataByMacAddress;
/**
 * Upload File
 * @param {Request} req
 * @param {Request} req
 */
const uploadFileToS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const unlinkFile = (0, util_1.promisify)(fs_1.default.unlink);
        const file = req === null || req === void 0 ? void 0 : req.file;
        const result = yield (0, multer_1.uploadFile)(file);
        unlinkFile(file.path);
        const ota = yield models_1.File.create({
            userId: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id,
            fileURL: result.Location,
            fileName: file === null || file === void 0 ? void 0 : file.originalname,
            macAddress: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.macAddress,
            key: result.Key,
        });
        ota.save();
        return res.status(200).json({ message: "File Uploaded", data: ota });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.uploadFileToS3 = uploadFileToS3;
/**
 * Upload File
 * @param {Request} req
 * @param {Request} req
 */
const deleteFileFromS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { Key }: { Key: string } = req?.body;
        //Deleting File from S3
        yield (0, multer_1.deleteFile)(req === null || req === void 0 ? void 0 : req.params.key);
        //Deleting File from DB
        yield models_1.File.findOneAndDelete({ key: req.params.key });
        return res.status(200).json({ message: "File Deleted" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.deleteFileFromS3 = deleteFileFromS3;
/**
 * Get All Files
 * @param {Request} req
 * @param {Request} req
 */
const getAllFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const files = yield models_1.File.find((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.query);
        return res.status(200).json({ files });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllFiles = getAllFiles;
