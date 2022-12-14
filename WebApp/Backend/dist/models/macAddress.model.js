"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const macAddressSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    deviceDetails: [
        {
            macAddress: { type: String },
            btnName: { type: String },
            btnState: { type: String },
            date: { type: Date },
        },
    ],
}, { timestamps: true });
const MacAddress = (0, mongoose_1.model)("MacAddress", macAddressSchema);
exports.default = MacAddress;
