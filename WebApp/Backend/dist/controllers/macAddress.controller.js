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
exports.removeMacAddress = exports.addMacAddress = exports.getAllMacAddress = void 0;
const models_1 = require("../models");
/**
 * Get All Macaddress of LoggedIn User
 * @param {Request} req
 * @param {Request} req
 */
const getAllMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const macAddressess = yield models_1.User.findOne({
            _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id,
        }).select("macAddress");
        return res.status(200).json({ macAddressess });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getAllMacAddress = getAllMacAddress;
/**
 * Add New Macaddress
 * @param {Request} req
 * @param {Request} req
 */
const addMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    try {
        yield models_1.User.findOneAndUpdate({ _id: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id }, {
            $push: {
                macAddress: { macAddress: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.macAddress },
            },
        }, { upsert: true });
        yield models_1.Mqtt.findOneAndUpdate({ macAddress: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.macAddress }, { macAddress: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.macAddress, status: "offline" }, { upsert: true });
        return res.status(200).json({ message: "MacAddress Added Successfully!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.addMacAddress = addMacAddress;
/**
 * Add New Macaddress
 * @param {Request} req
 * @param {Request} req
 */
const removeMacAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j;
    try {
        let { userId } = req === null || req === void 0 ? void 0 : req.body;
        userId = ((_f = req === null || req === void 0 ? void 0 : req.user) === null || _f === void 0 ? void 0 : _f.role) === "admin" ? userId : (_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g._id;
        yield models_1.User.findOneAndUpdate({ _id: userId }, {
            $pull: {
                macAddress: { macAddress: (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.macAddress },
            },
        });
        yield models_1.Mqtt.deleteMany({ macAddress: (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.macAddress });
        return res.status(200).json({ message: "MacAddress Deleted!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.removeMacAddress = removeMacAddress;
