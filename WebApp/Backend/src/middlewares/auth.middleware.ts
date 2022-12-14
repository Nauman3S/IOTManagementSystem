import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import Config from "../config";
import { userFind } from "../helpers";

interface JwtPayload {
  id: string;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const token =
      req.headers["x-access-token"] || req.headers.authorization?.split(" ")[1];

    const { id } = verify(
      token as string,
      Config.JWT_SECRET as string
    ) as JwtPayload;

    const user = await userFind({ _id: id });

    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "User Not exists/Invalid Token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
