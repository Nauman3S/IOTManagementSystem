"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const counts_controller_1 = require("../controllers/counts.controller");
const router = (0, express_1.Router)();
/**
 * Get Counts
 * @body
 */
router.get("/", counts_controller_1.dashboardCounts);
exports.default = router;
