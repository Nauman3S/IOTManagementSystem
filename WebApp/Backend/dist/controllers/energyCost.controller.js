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
exports.addEnergyCost = exports.getEnerygyCost = void 0;
const models_1 = require("../models");
const getEnerygyCost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const enerygyCost = yield models_1.EnergyCost.findOne({ userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
        return res.status(200).json(enerygyCost);
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.getEnerygyCost = getEnerygyCost;
const addEnergyCost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { energyCost } = req === null || req === void 0 ? void 0 : req.body;
        yield models_1.EnergyCost.findOneAndUpdate({
            userId: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id,
        }, {
            energyCost,
        }, { upsert: true });
        return res.status(200).json({ message: "Sensor Value Added" });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.addEnergyCost = addEnergyCost;
