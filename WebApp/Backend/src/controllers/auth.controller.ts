import { Request, Response } from "express";
import { userFind, userExists, validateEmail } from "../helpers";
import { User } from "../models";
import { IUserDocument } from "../types/types";
import { sendOTP } from "../libraries/nodemailer";
import { hash } from "bcryptjs";

/**
 * This Function allows User to login To his respective Dashboard based on Role [Admin, Client]
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req?.body;
    const user = await userFind({
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(401).json({ message: "User not exists on this email" });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Email/Password does not match" });
    }

    const token = await user.getToken();
    res.status(200).json({
      message: "Logged In",
      token,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
    });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

/**
 * Creates new instance of User in database
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const signUp = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      password,
      role = "client",
    }: {
      fullName: string;
      email: string;
      password: string;
      role: string;
    } = req?.body;

    if (await userExists(email)) {
      return res
        .status(500)
        .json({ message: `User already registered with this email ${email}` });
    }

    if (!(await validateEmail(email))) {
      return res
        .status(500)
        .json({ message: "Please enter correct email address" });
    }
    const user = await User.create({
      fullName,
      email,
      password,
      role,
    });

    user.save();

    return res.status(200).json({ message: "User Signed Up Successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

/**
 * Get :Logged In User Profile from database
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const myProfile = async (
  req: Request,
  res: Response
): Promise<Response<IUserDocument>> => {
  try {
    const user = await User.findById(req?.user?._id).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email }: { email: string } = req?.body;

    if (!(await userExists(email))) {
      return res.status(500).json({
        message: `User with this email ${email} is not exists, please signup`,
      });
    }
    const randomOTP: number = Math.floor(1000 + Math.random() * 900);
    await User.findOneAndUpdate(
      { email: email },
      { "otp.code": randomOTP },
      { upsert: true }
    );

    await sendOTP(email, "Smart Devices System - OTP", randomOTP);
    return res.status(200).json({
      message: `A OTP Verification Code is sent to your email ${email}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, code }: { email: string; code: number } = req?.body;
    const user = await User.findOne({
      $and: [{ email }, { "otp.code": code }],
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "OTP not valid, please try again", status: false });
    }
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          "otp.status": true,
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: "OTP Verified",
    });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req?.body;
    const user = await User.findOne({ email: email });

    if (user?.otp?.status === true) {
      await User.findOneAndUpdate(
        { email },
        {
          $set: {
            password: await hash(password, 10),
            clientPassword: user?.role === "client" ? password : user?.role,
          },
          $unset: {
            "otp.code": "",
            "otp.status": false,
          },
        }
      );
    } else {
      return res.status(401).json({ message: "OTP is not verified" });
    }
    return res.status(200).json({
      message:
        "Password Updated Successfully! Please login with the new password",
    });
  } catch (error) {
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: (error as Error).message,
    });
  }
};
