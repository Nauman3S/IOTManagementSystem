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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProgram = exports.deleteProgram = exports.getAllPrograms = exports.getProgramsOfLoggedInUser = exports.addProgram = exports.publishToMqtt = void 0;
const models_1 = require("../models");
const mqtt_1 = require("../libraries/mqtt");
const mqttClient = (0, mqtt_1.connect)();
/**
 * Publish Data to MQtt
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const publishToMqtt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let { message } = req === null || req === void 0 ? void 0 : req.body;
        const macAddress = ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.macAddress) + "/smartsds";
        message = JSON.stringify(message);
        mqttClient.publish(macAddress, message, { qos: 0, retain: false }, (error) => {
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
 * Post Programs of One User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const addProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const { programName, command } = req === null || req === void 0 ? void 0 : req.body;
        const program = yield models_1.Program.create({
            userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
            programName,
            command,
            adminId: (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.adminId,
        });
        program.save();
        return res.status(200).json({ program });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.addProgram = addProgram;
/**
 * Get All Programs of One User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getProgramsOfLoggedInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const data = ((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.role) === "admin"
            ? yield models_1.Program.find({ adminId: (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e._id })
            : yield models_1.Program.find({ userId: (_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f._id });
        return res.status(200).json({ data });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getProgramsOfLoggedInUser = getProgramsOfLoggedInUser;
/**
 * Get All Programs
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getAllPrograms = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.Program.find();
        return res.status(200).json({ data });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllPrograms = getAllPrograms;
/**
 * Delete Programs
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const deleteProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.Program.findByIdAndDelete(req.body.id);
        return res.status(200).json("Program Deleted Successfully");
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.deleteProgram = deleteProgram;
const editProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { programName, command } = req === null || req === void 0 ? void 0 : req.body;
        yield models_1.Program.findByIdAndUpdate(req.body.id, {
            programName,
            command,
        });
        return res.status(200).json("Program Updated Successfully");
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.editProgram = editProgram;
