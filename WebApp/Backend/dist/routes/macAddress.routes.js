"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const macAddress_controller_1 = require("../controllers/macAddress.controller");
const router = (0, express_1.Router)();
/**
 * Add new Macaddress
 * @body
 * macAddress - {string}
 */
router.patch("/add", macAddress_controller_1.addMacAddress);
/**
 * Get All Macaddress of LoggedIn User
 */
router.get("/all", macAddress_controller_1.getAllMacAddress);
/**
 * Delete Macaddress of LoggedIn User
 * @body
 * macAddress - {string}
 */
router.patch("/remove", macAddress_controller_1.removeMacAddress);
exports.default = router;
