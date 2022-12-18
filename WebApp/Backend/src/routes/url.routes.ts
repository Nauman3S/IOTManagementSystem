import { Router } from "express";
import {
  addUrl,
  getUrlsOfLoggedInUser,
  getAllUrls,
  deleteUrl,
  editUrl,
} from "../controllers/url.controller";

const router: Router = Router();

/**
 * Post a New Program
 * @body
 * programName - {string}
 * command - {string}
 */
router.post("/post", addUrl);

/**
 * Get Programs of LoggedIn User
 */
router.get("/", getUrlsOfLoggedInUser);

/**
 * Get All Programs
 */
router.post("/all", getAllUrls);

/**
 * Delete Program
 */
router.patch("/delete", deleteUrl);

/**
 * Update Program
 */
router.patch("/edit", editUrl);

export default router;
