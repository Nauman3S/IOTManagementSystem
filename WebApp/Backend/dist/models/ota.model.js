"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const otaSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    fileURL: { type: String },
    fileName: { type: String },
    key: { type: String },
}, { timestamps: true });
const Ota = (0, mongoose_1.model)("OTA", otaSchema);
exports.default = Ota;
