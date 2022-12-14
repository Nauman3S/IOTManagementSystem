import { Request, Response } from "express";
import { User } from "../models";

/**
 * Send Dashboard counts
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const dashboardCounts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let macAddressCount = await User.aggregate([
      { $match: { _id: req?.user?._id } },
      { $project: { macAddress: { $size: "$macAddress" } } },
    ]);

    return res.status(200).json({ macAddressCount: macAddressCount[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};
