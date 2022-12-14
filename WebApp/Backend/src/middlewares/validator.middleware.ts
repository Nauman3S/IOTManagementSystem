import { NextFunction, Request, Response } from "express";

/**
 * Validates Admin
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {NextFunction} next - Next Function
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction) =>
  req?.user?.role === "admin" || req?.user?.role === "superAdmin"
    ? next()
    : res.status(400).json({ message: "Not admin" });
