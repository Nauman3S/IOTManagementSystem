"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const button_controller_1 = require("../controllers/button.controller");
const router = (0, express_1.Router)();
/**
 * Get All Buttons
 * @body - Macaddress - {string}
 */
router.post("/all", button_controller_1.getButtons);
/**
 * Update Button State
 * @body
 * macAddress -{string}
 * objId - {string}
 * state - {number}
 */
router.patch("/update", button_controller_1.updateBtnState);
router.patch("/change", button_controller_1.changing);
exports.default = router;
