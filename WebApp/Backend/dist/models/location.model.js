"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    macAddress: { type: String },
    longitude: { type: Number },
    latitude: { type: Number },
}, { timestamps: true });
const Location = (0, mongoose_1.model)("DeviceLocation", locationSchema);
exports.default = Location;
