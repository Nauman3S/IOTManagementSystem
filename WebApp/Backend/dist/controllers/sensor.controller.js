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
exports.getSensorValues = exports.addSensorValue = exports.removeSensorName = exports.updateSensorNames = exports.getSensorNames = void 0;
const models_1 = require("../models");
const getSensorNames = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sensors = yield models_1.Sensor.find();
        return res.status(200).json(sensors);
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.getSensorNames = getSensorNames;
const updateSensorNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        yield models_1.Sensor.findOneAndUpdate({ userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id }, {
            $push: {
                sensors: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.sensor,
            },
        }, { upsert: true });
        return res.status(200).json({ message: "Sensor Name updated" });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.updateSensorNames = updateSensorNames;
const removeSensorName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        let { sensorName } = req === null || req === void 0 ? void 0 : req.body;
        yield models_1.Sensor.findOneAndUpdate({ userId: (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id }, {
            $pull: {
                sensors: sensorName,
            },
        });
        return res.status(200).json({ message: "MacAddress Deleted!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `INTERNAL SERVER ERROR: ${error.message}` });
    }
});
exports.removeSensorName = removeSensorName;
const addSensorValue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { macAddress, sensorName } = req === null || req === void 0 ? void 0 : req.body;
        yield models_1.SensorValue.findOneAndUpdate({
            userId: (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d._id,
            macAddress: macAddress,
            sensorName: sensorName,
        }, Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { upsert: true });
        return res.status(200).json({ message: "Sensor Value Added" });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.addSensorValue = addSensorValue;
const getSensorValues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const sensors = yield models_1.SensorValue.find({
            userId: (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e._id,
            macAddress: (_f = req === null || req === void 0 ? void 0 : req.params) === null || _f === void 0 ? void 0 : _f.macAddress,
        }).select("-_id -__v -createdAt -updatedAt -userId -macAddress");
        return res.status(200).json(sensors);
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.getSensorValues = getSensorValues;
