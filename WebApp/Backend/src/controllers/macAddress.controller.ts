import { Request, Response } from "express";
import { User, Mqtt } from "../models";
import { IMacAddress } from "../types/types";

/**
 * Get All Macaddress of LoggedIn User
 * @param {Request} req
 * @param {Request} req
 */
export const getAllMacAddress = async (
  req: Request,
  res: Response
): Promise<Response<IMacAddress>> => {
  try {
    const macAddressess = await User.findOne({
      _id: req?.user?._id,
    }).select("macAddress");
    return res.status(200).json({ macAddressess });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Add New Macaddress
 * @param {Request} req
 * @param {Request} req
 */
export const addMacAddress = async (req: Request, res: Response) => {
  try {
    await User.findOneAndUpdate(
      { _id: req?.user?._id },
      {
        $push: {
          macAddress: { macAddress: req?.body?.macAddress },
        },
      },
      { upsert: true }
    );

    return res.status(200).json({ message: "MacAddress Added Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Add New Macaddress
 * @param {Request} req
 * @param {Request} req
 */
export const removeMacAddress = async (req: Request, res: Response) => {
  try {
    let { userId }: { userId: string } = req?.body;
    userId = req?.user?.role === "admin" ? userId : req?.user?._id;
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          macAddress: { macAddress: req?.body?.macAddress },
        },
      }
    );
    await Mqtt.deleteMany({ macAddress: req?.body?.macAddress });
    return res.status(200).json({ message: "MacAddress Deleted!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};
