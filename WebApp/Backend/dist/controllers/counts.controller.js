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
exports.dashboardCounts = void 0;
const models_1 = require("../models");
/**
 * Send Dashboard counts
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const dashboardCounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let macAddressCount = yield models_1.User.aggregate([
            { $match: { _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id } },
            { $project: { macAddress: { $size: "$macAddress" } } },
        ]);
        return res.status(200).json({ macAddressCount: macAddressCount[0] });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.dashboardCounts = dashboardCounts;
