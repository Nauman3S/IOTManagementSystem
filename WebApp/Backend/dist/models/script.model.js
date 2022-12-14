"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const scriptSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    programName: { type: String },
    command: { type: String },
    macAddress: { type: String },
}, { timestamps: true });
const Script = (0, mongoose_1.model)("Script", scriptSchema);
exports.default = Script;
