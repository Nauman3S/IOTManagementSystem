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
const colors_1 = require("colors");
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const options = (process.env.NODE_ENV === "development" && {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) ||
    (process.env.NODE_ENV === "production" && {
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
function default_1() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)((_a = config_1.default.MONGO_URI) !== null && _a !== void 0 ? _a : "", options, () => {
            try {
                console.log((0, colors_1.blue)(`DB connected ✅`));
            }
            catch (error) {
                console.log(error);
            }
        });
    });
}
exports.default = default_1;
