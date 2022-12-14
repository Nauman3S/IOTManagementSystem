"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.userExists = exports.userFind = void 0;
const models_1 = require("../models");
const validator_1 = __importDefault(require("validator"));
const userFind = (data) => models_1.User.findOne(data);
exports.userFind = userFind;
const userExists = (email) => models_1.User.exists({ email });
exports.userExists = userExists;
const validateEmail = (email) => validator_1.default.isEmail(email);
exports.validateEmail = validateEmail;
