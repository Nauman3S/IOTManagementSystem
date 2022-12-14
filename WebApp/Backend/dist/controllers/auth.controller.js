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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyOTP = exports.forgotPassword = exports.myProfile = exports.signUp = exports.login = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const nodemailer_1 = require("../libraries/nodemailer");
const bcryptjs_1 = require("bcryptjs");
/**
 * This Function allows User to login To his respective Dashboard based on Role [Admin, Client]
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req === null || req === void 0 ? void 0 : req.body;
        const user = yield (0, helpers_1.userFind)({
            email: email.toLowerCase(),
        });
        if (!user) {
            return res.status(401).json({ message: "User not exists on this email" });
        }
        if (!(yield user.comparePassword(password))) {
            return res.status(401).json({ message: "Email/Password does not match" });
        }
        const token = yield user.getToken();
        res.status(200).json({
            message: "Logged In",
            token,
            role: user.role,
            email: user.email,
            fullName: user.fullName,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.login = login;
/**
 * Creates new instance of User in database
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password, role = "client", } = req === null || req === void 0 ? void 0 : req.body;
        if (yield (0, helpers_1.userExists)(email)) {
            return res
                .status(500)
                .json({ message: `User already registered with this email ${email}` });
        }
        if (!(yield (0, helpers_1.validateEmail)(email))) {
            return res
                .status(500)
                .json({ message: "Please enter correct email address" });
        }
        const user = yield models_1.User.create({
            fullName,
            email,
            password,
            role,
        });
        user.save();
        return res.status(200).json({ message: "User Signed Up Successfully" });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.signUp = signUp;
/**
 * Get :Logged In User Profile from database
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
const myProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield models_1.User.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id).select("-password");
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.myProfile = myProfile;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req === null || req === void 0 ? void 0 : req.body;
        if (!(yield (0, helpers_1.userExists)(email))) {
            return res.status(500).json({
                message: `User with this email ${email} is not exists, please signup`,
            });
        }
        const randomOTP = Math.floor(1000 + Math.random() * 900);
        yield models_1.User.findOneAndUpdate({ email: email }, { "otp.code": randomOTP }, { upsert: true });
        yield (0, nodemailer_1.sendOTP)(email, "Smart Devices System - OTP", randomOTP);
        return res.status(200).json({
            message: `A OTP Verification Code is sent to your email ${email}`,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.forgotPassword = forgotPassword;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code } = req === null || req === void 0 ? void 0 : req.body;
        const user = yield models_1.User.findOne({
            $and: [{ email }, { "otp.code": code }],
        });
        if (!user) {
            return res
                .status(401)
                .json({ message: "OTP not valid, please try again", status: false });
        }
        yield models_1.User.findOneAndUpdate({ _id: user._id }, {
            $set: {
                "otp.status": true,
            },
        }, { new: true, upsert: true });
        return res.status(200).json({
            message: "OTP Verified",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.verifyOTP = verifyOTP;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { email, password } = req === null || req === void 0 ? void 0 : req.body;
        const user = yield models_1.User.findOne({ email: email });
        if (((_b = user === null || user === void 0 ? void 0 : user.otp) === null || _b === void 0 ? void 0 : _b.status) === true) {
            yield models_1.User.findOneAndUpdate({ email }, {
                $set: {
                    password: yield (0, bcryptjs_1.hash)(password, 10),
                    clientPassword: (user === null || user === void 0 ? void 0 : user.role) === "client" ? password : user === null || user === void 0 ? void 0 : user.role,
                },
                $unset: {
                    "otp.code": "",
                    "otp.status": false,
                },
            });
        }
        else {
            return res.status(401).json({ message: "OTP is not verified" });
        }
        return res.status(200).json({
            message: "Password Updated Successfully! Please login with the new password",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message,
        });
    }
});
exports.resetPassword = resetPassword;
