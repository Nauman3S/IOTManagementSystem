"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const buttonSchema = new mongoose_1.Schema({
    macAddress: { type: String },
    buttons: [
        {
            name: { type: String },
            state: { type: Number, enum: [0, 1] },
            value: { type: Number },
        },
    ],
}, { timestamps: true });
const Button = (0, mongoose_1.model)("Button", buttonSchema);
exports.default = Button;
