"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const urlSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    url: { type: String },
    macAddress: { type: String },
}, { timestamps: true });
const Url = (0, mongoose_1.model)("Url", urlSchema);
exports.default = Url;
