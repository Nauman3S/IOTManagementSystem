"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sensorValueSchema = new mongoose_1.Schema({
    macAddress: { type: String },
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    sensorName: { type: String },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
}, { timestamps: true });
const SensorValue = (0, mongoose_1.model)("SensorValue", sensorValueSchema);
exports.default = SensorValue;
