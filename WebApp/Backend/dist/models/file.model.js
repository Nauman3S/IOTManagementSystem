"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    fileURL: { type: String },
    fileName: { type: String },
    key: { type: String },
    macAddress: { type: String },
    type: { type: String, enum: ["file", "url"] },
}, { timestamps: true });
const File = (0, mongoose_1.model)("File", fileSchema);
exports.default = File;
