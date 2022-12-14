"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sensorSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    sensors: [{ type: String }],
}, { timestamps: true });
const Sensor = (0, mongoose_1.model)("Sensor", sensorSchema);
exports.default = Sensor;
