"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const energyCost_controller_1 = require("../controllers/energyCost.controller");
const router = (0, express_1.Router)();
/**
 * getEnerygyCost
 */
router.get("/", energyCost_controller_1.getEnerygyCost);
/**
 * addEnergyCost
 * @params - {energyCost} - {number}
 */
router.patch("/", energyCost_controller_1.addEnergyCost);
exports.default = router;
