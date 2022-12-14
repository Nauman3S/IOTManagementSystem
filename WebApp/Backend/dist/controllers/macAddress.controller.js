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
    var _b, _c;
    try {
        yield models_1.User.findOneAndUpdate({ _id: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id }, {
            $push: {
                macAddress: { macAddress: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.macAddress },
            },
        }, { upsert: true });
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
    var _d, _e, _f, _g;
    try {
        let { userId } = req === null || req === void 0 ? void 0 : req.body;
        userId = ((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.role) === "admin" ? userId : (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e._id;
        yield models_1.User.findOneAndUpdate({ _id: userId }, {
            $pull: {
                macAddress: { macAddress: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.macAddress },
            },
        });
        yield models_1.Mqtt.deleteMany({ macAddress: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.macAddress });
        return res.status(200).json({ message: "MacAddress Deleted!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.removeMacAddress = removeMacAddress;
