import { Router } from "express";
import {
  dashboardCounts,
  getAllUsers,
  getAllUsersMacaddress,
  getAllUsersMqttData,
  getOneUsersMqttData,
  deleteUser,
} from "../controllers/admin/admin.controller";

const router: Router = Router();

/**
 * Get Dashbord Counts
 */
router.get("/count", dashboardCounts);

/**
 * Get All Users
 */
router.get("/all-users", getAllUsers);

/**
 * Get All Users
 */
router.patch("/delete-user", deleteUser);

/**
 * Get All Users Macaddress
 */
router.get("/all-macAddress", getAllUsersMacaddress);

/**
 * Get All Users Mqtt Data
 */
router.get("/all-mqttData", getAllUsersMqttData);

/**
 * Get All Users Mqtt Data
 */
router.get("/mqttData", getOneUsersMqttData);

export default router;
