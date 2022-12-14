"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * Login User
 * @body
 * email - {string}
 * password - {string}
 */
router.post("/login", auth_controller_1.login);
/**
 * Signup User
 * @body
 * email - {string}
 * password - {string}
 */
router.post("/signup", auth_controller_1.signUp);
/**
 * User Profile
 */
router.get("/my-profile", auth_middleware_1.isAuthenticated, auth_controller_1.myProfile);
/**
 * Forgot Password
 */
router.post("/forgot", auth_controller_1.forgotPassword);
/**
 * Verify OTP
 */
router.post("/verify", auth_controller_1.verifyOTP);
/**
 * Reset Password
 */
router.post("/reset", auth_controller_1.resetPassword);
exports.default = router;
