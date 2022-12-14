"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const userSchema = new mongoose_1.Schema({
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
        type: String,
        enum: ["admin", "client"],
        default: "client",
    },
    macAddress: [{ macAddress: { type: String } }],
    otp: {
        code: { type: Number },
        status: { type: Boolean, default: false },
    },
}, { timestamps: true, bufferTimeoutMS: 50000 });
//Save Password Hash
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        this.password = yield (0, bcryptjs_1.hash)(this.password, 10);
    });
});
//Compare Hashed Password with User Entered Password
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, bcryptjs_1.compare)(password, this.password);
    });
};
//Generate JWT Token
userSchema.methods.getToken = function () {
    return (0, jsonwebtoken_1.sign)({ id: this._id }, config_1.default.JWT_SECRET, {
        expiresIn: config_1.default.JWT_EXPIRE_TIME,
    });
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
