"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const programSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    adminId: { type: String },
    programName: { type: String },
    command: { type: String },
}, { timestamps: true });
const Program = (0, mongoose_1.model)("Program", programSchema);
exports.default = Program;
