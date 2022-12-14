import { Router } from "express";
import {
  addProgram,
  getProgramsOfLoggedInUser,
  getAllPrograms,
  deleteProgram,
  editProgram,
} from "../controllers/script.controller";

const router: Router = Router();

/**
 * Post a New Program
 * @body
 * programName - {string}
 * command - {string}
 */
router.post("/post", addProgram);

/**
 * Get Programs of LoggedIn User
 */
router.get("/", getProgramsOfLoggedInUser);

/**
 * Get All Programs
 */
router.post("/all", getAllPrograms);

/**
 * Delete Program
 */
router.patch("/delete", deleteProgram);

/**
 * Update Program
 */
router.patch("/edit", editProgram);

export default router;
