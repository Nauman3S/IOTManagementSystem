"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const script_controller_1 = require("../controllers/script.controller");
const router = (0, express_1.Router)();
/**
 * Post a New Program
 * @body
 * programName - {string}
 * command - {string}
 */
router.post("/post", script_controller_1.addProgram);
/**
 * Get Programs of LoggedIn User
 */
router.get("/", script_controller_1.getProgramsOfLoggedInUser);
/**
 * Get All Programs
 */
router.post("/all", script_controller_1.getAllPrograms);
/**
 * Delete Program
 */
router.patch("/delete", script_controller_1.deleteProgram);
/**
 * Update Program
 */
router.patch("/edit", script_controller_1.editProgram);
exports.default = router;
