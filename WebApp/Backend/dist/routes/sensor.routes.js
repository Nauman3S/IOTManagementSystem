"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sensor_controller_1 = require("../controllers/sensor.controller");
const router = (0, express_1.Router)();
/**
 * Get Sensors Names
 */
router.get("/", sensor_controller_1.getSensorNames);
/**
 * Update Sensors Name
 */
router.patch("/", sensor_controller_1.updateSensorNames);
/**
 * Add Sensors Value
 */
router.patch("/add", sensor_controller_1.addSensorValue);
/**
 * Add Sensors Value
 */
router.patch("/remove", sensor_controller_1.removeSensorName);
/**
 * Get Sensors Value
 */
router.get("/get/:macAddress", sensor_controller_1.getSensorValues);
exports.default = router;
