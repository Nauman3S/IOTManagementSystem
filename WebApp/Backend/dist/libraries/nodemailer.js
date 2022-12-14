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
exports.sendOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendingEmail = "howto0158@gmail.com";
let transporter = nodemailer_1.default.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: sendingEmail,
        pass: "cbemivbxohsusiia",
    },
});
const sendOTP = (email, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    const message = {
        to: email,
        from: `Smart Devices System ${sendingEmail}`,
        subject: subject,
        text: "Your OTP Verification code is " + text.toString(),
    };
    yield transporter.sendMail(message);
});
exports.sendOTP = sendOTP;
