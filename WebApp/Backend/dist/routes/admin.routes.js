"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin/admin.controller");
const router = (0, express_1.Router)();
/**
 * Get Dashbord Counts
 */
router.get("/count", admin_controller_1.dashboardCounts);
/**
 * Get All Users
 */
router.get("/all-users", admin_controller_1.getAllUsers);
/**
 * Get All Users
 */
router.patch("/delete-user", admin_controller_1.deleteUser);
/**
 * Get All Users Macaddress
 */
router.get("/all-macAddress", admin_controller_1.getAllUsersMacaddress);
/**
 * Get All Users Mqtt Data
 */
router.get("/all-mqttData", admin_controller_1.getAllUsersMqttData);
/**
 * Get All Users Mqtt Data
 */
router.get("/mqttData", admin_controller_1.getOneUsersMqttData);
exports.default = router;
