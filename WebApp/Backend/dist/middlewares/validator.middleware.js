"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
/**
 * Validates Admin
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {NextFunction} next - Next Function
 */
const isAdmin = (req, res, next) => {
    var _a, _b;
    return ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin" || ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role) === "superAdmin"
        ? next()
        : res.status(400).json({ message: "Not admin" });
};
exports.isAdmin = isAdmin;
