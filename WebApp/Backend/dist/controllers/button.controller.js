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
exports.changing = exports.updateBtnState = exports.getButtons = void 0;
const models_1 = require("../models");
/**
 * Get All Buttons States of One LoggedIn User
 * @param req - Request
 * @param res - Response
 *
 */
const getButtons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const button = yield models_1.Button.findOne({ macAddress: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.macAddress });
        return res.status(200).json({ button });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.getButtons = getButtons;
/**
 * Update Button State
 * @param req - Request
 * @param res - Response
 */
const updateBtnState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        yield models_1.Button.findOneAndUpdate({
            macAddress: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.macAddress,
            buttons: { $elemMatch: { _id: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.objId } },
        }, {
            $set: { "buttons.$.state": (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.state },
        });
        return res.status(200).json({ message: "State Updated Successfully!" });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.updateBtnState = updateBtnState;
const changing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const button = [
            {
                name: "Get Logs",
                state: 0,
                value: 19,
            },
        ];
        yield models_1.Button.findOneAndUpdate({
            macAddress: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.macAddress,
        }, {
            $push: { buttons: button },
        });
        return res.status(200).json({ message: "State Updated Successfully!" });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.changing = changing;
