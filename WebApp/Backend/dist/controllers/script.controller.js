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
exports.editProgram = exports.deleteProgram = exports.getAllPrograms = exports.getProgramsOfLoggedInUser = exports.addProgram = void 0;
const models_1 = require("../models");
/**
 * Post Programs of One User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const addProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { programName, command, macAddress, } = req === null || req === void 0 ? void 0 : req.body;
        const program = yield models_1.Script.create({
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            programName,
            command,
            macAddress,
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
    var _b;
    try {
        const data = models_1.Script.find((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.query);
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
const getAllPrograms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    try {
        const data = ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.macAddress) === ""
            ? yield models_1.Script.find({
                userId: (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.id,
            })
            : yield models_1.Script.find({
                userId: (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.id,
                macAddress: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.macAddress,
            });
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
        yield models_1.Script.findByIdAndDelete(req.body.id);
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
        yield models_1.Script.findByIdAndUpdate(req.body.id, {
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
