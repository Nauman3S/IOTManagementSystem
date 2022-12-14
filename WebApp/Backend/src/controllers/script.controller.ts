import { Request, Response } from "express";
import { Script } from "../models";

/**
 * Post Programs of One User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const addProgram = async (req: Request, res: Response) => {
  try {
    const {
      programName,
      command,
      macAddress,
    }: { programName: string; command: string; macAddress: string } = req?.body;

    const program = await Script.create({
      userId: req.user?._id,
      programName,
      command,
      macAddress,
    });

    program.save();

    return res.status(200).json({ program });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Programs of One User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getProgramsOfLoggedInUser = async (
  req: Request,
  res: Response
) => {
  try {
    const data = Script.find(req?.body?.query);

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Programs
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getAllPrograms = async (req: Request, res: Response) => {
  try {
    const data =
      req?.body?.macAddress === ""
        ? await Script.find({
            userId: req?.user?.id,
          })
        : await Script.find({
            userId: req?.user?.id,
            macAddress: req?.body?.macAddress,
          });
    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};
/**
 * Delete Programs
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const deleteProgram = async (req: Request, res: Response) => {
  try {
    await Script.findByIdAndDelete(req.body.id);
    return res.status(200).json("Program Deleted Successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

export const editProgram = async (req: Request, res: Response) => {
  try {
    const { programName, command }: { programName: string; command: string } =
      req?.body;

    await Script.findByIdAndUpdate(req.body.id, {
      programName,
      command,
    });

    return res.status(200).json("Program Updated Successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};
