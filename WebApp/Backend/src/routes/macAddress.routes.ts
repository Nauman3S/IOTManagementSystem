import { Router } from "express";
import {
  addMacAddress,
  getAllMacAddress,
  removeMacAddress,
} from "../controllers/macAddress.controller";

const router: Router = Router();

/**
 * Add new Macaddress
 * @body
 * macAddress - {string}
 */
router.patch("/add", addMacAddress);

/**
 * Get All Macaddress of LoggedIn User
 */
router.get("/all", getAllMacAddress);

/**
 * Delete Macaddress of LoggedIn User
 * @body
 * macAddress - {string}
 */
router.patch("/remove", removeMacAddress);

export default router;
