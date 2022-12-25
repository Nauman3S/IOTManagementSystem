import { Router } from "express";
import {
  login,
  signUp,
  myProfile,
  forgotPassword,
  verifyOTP,
  resetPassword,
  updateUser,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router: Router = Router();

/**
 * Login User
 * @body
 * email - {string}
 * password - {string}
 */
router.post("/login", login);

/**
 * Signup User
 * @body
 * email - {string}
 * password - {string}
 */
router.post("/signup", signUp);

/**
 * User Profile
 */
router.get("/my-profile", isAuthenticated, myProfile);

/**
 * Forgot Password
 */
router.post("/forgot", forgotPassword);

/**
 * Verify OTP
 */
router.post("/verify", verifyOTP);

/**
 * Reset Password
 */
router.post("/reset", resetPassword);

/**
 * Update User
 */
router.patch("/update-user", isAuthenticated, updateUser);

export default router;
