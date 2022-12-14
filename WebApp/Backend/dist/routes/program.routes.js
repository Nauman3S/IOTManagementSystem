"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const program_controller_1 = require("../controllers/program.controller");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const admin_controller_1 = require("../controllers/admin/admin.controller");
const router = (0, express_1.Router)();
// postToMqtt();
/**
 * Publish data to Mqtt
 */
// router.post("/publish/:macAddress", publishToMqtt);
/**
 * Post a New Program
 * @body
 * programName - {string}
 * command - {string}
 */
router.post("/post", program_controller_1.addProgram);
/**
 * Get Programs of LoggedIn User
 */
router.get("/", program_controller_1.getProgramsOfLoggedInUser);
/**
 * Get All Programs
 */
router.get("/all", validator_middleware_1.isAdmin, program_controller_1.getAllPrograms);
/**
 * Get Sensor Names
 */
router.get("/sensor", admin_controller_1.getSensorNames);
/**
 * Delete Program
 */
router.patch("/delete", program_controller_1.deleteProgram);
/**
 * Update Program
 */
router.patch("/edit", program_controller_1.editProgram);
exports.default = router;
