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
exports.editUrl = exports.deleteUrl = exports.getAllUrls = exports.getUrlsOfLoggedInUser = exports.addUrl = void 0;
const models_1 = require("../models");
/**
 * Post Url of One User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const addUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { url, macAddress } = req === null || req === void 0 ? void 0 : req.body;
        const urlRes = yield models_1.Url.create({
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            url,
            macAddress,
        });
        urlRes.save();
        return res.status(200).json({ url });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.addUrl = addUrl;
/**
 * Get All Urls of One User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getUrlsOfLoggedInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const data = models_1.Url.find((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.query);
        return res.status(200).json({ data });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.getUrlsOfLoggedInUser = getUrlsOfLoggedInUser;
/**
 * Get All Urls
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const getAllUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    try {
        const data = ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.macAddress) === ""
            ? yield models_1.Url.find({
                userId: (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.id,
            })
            : yield models_1.Url.find({
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
exports.getAllUrls = getAllUrls;
/**
 * Delete Urls
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.Url.findByIdAndDelete(req.body.id);
        return res.status(200).json("Program Deleted Successfully");
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.deleteUrl = deleteUrl;
const editUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const { url } = req === null || req === void 0 ? void 0 : req.body;
        console.log(url, (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.id);
        yield models_1.Url.findByIdAndUpdate(req.body.id, {
            url,
        });
        return res.status(200).json("Program Updated Successfully");
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.editUrl = editUrl;
