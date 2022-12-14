"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminUserSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
const AdminUser = (0, mongoose_1.model)("AdminUser", adminUserSchema);
exports.default = AdminUser;
