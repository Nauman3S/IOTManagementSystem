import { Request, Response } from "express";
import { Url } from "../models";

/**
 * Post Url of One User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const addUrl = async (req: Request, res: Response) => {
  try {
    const { url, macAddress }: { url: string; macAddress: string } = req?.body;

    const urlRes = await Url.create({
      userId: req.user?._id,
      url,
      macAddress,
    });

    urlRes.save();

    return res.status(200).json({ url });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Urls of One User
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getUrlsOfLoggedInUser = async (req: Request, res: Response) => {
  try {
    const data = Url.find(req?.body?.query);

    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Urls
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getAllUrls = async (req: Request, res: Response) => {
  try {
    const data =
      req?.body?.macAddress === ""
        ? await Url.find({
            userId: req?.user?.id,
          })
        : await Url.find({
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
 * Delete Urls
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const deleteUrl = async (req: Request, res: Response) => {
  try {
    await Url.findByIdAndDelete(req.body.id);
    return res.status(200).json("Program Deleted Successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

export const editUrl = async (req: Request, res: Response) => {
  try {
    const { url }: { url: string } = req?.body;
    console.log(url, req?.body?.id);

    await Url.findByIdAndUpdate(req.body.id, {
      url,
    });

    return res.status(200).json("Program Updated Successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};
