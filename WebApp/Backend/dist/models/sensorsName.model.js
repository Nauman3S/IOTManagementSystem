"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sensorSchema = new mongoose_1.Schema({
    sensor1: { type: String },
    sensor2: { type: String },
    sensor3: { type: String },
}, { timestamps: true });
const Sensor = (0, mongoose_1.model)("Sensor", sensorSchema);
exports.default = Sensor;
