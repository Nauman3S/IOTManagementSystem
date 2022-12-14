"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const energyCostSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    energyCost: { type: Number, default: 0 },
}, { timestamps: true });
const EnergyCost = (0, mongoose_1.model)("EnergyCost", energyCostSchema);
exports.default = EnergyCost;
