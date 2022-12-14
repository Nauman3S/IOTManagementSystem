import { User } from "../models";
import validator from "validator";

export const userFind = (data: object) => User.findOne(data);

export const userExists = (email: string) => User.exists({ email });

export const validateEmail = (email: string) => validator.isEmail(email);
