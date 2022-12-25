"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_controller_1 = require("../controllers/url.controller");
const router = (0, express_1.Router)();
/**
 * Post a New Program
 * @body
 * programName - {string}
 * command - {string}
 */
router.post("/post", url_controller_1.addUrl);
/**
 * Get Programs of LoggedIn User
 */
router.get("/", url_controller_1.getUrlsOfLoggedInUser);
/**
 * Get All Programs
 */
router.post("/all", url_controller_1.getAllUrls);
/**
 * Delete Program
 */
router.patch("/delete", url_controller_1.deleteUrl);
/**
 * Update Program
 */
router.patch("/edit", url_controller_1.editUrl);
exports.default = router;
