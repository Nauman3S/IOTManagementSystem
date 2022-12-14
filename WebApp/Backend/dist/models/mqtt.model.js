"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mqttSchema = new mongoose_1.Schema({
    macAddress: { type: String },
    status: { type: String },
}, {
    timestamps: true,
});
const Mqtt = (0, mongoose_1.model)("Mqtt", mqttSchema);
exports.default = Mqtt;
