import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { model, Schema } from "mongoose";
import Config from "../config";
import { IUserDocument } from "../types/types";

const userSchema = new Schema<IUserDocument>(
  {
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },
    macAddress: [{ macAddress: { type: String } }],
    otp: {
      code: { type: Number },
      status: { type: Boolean, default: false },
    },
  },
  { timestamps: true, bufferTimeoutMS: 50000 }
);

//Save Password Hash
userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hash(this.password, 10);
});

//Compare Hashed Password with User Entered Password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return compare(password, this.password);
};

//Generate JWT Token
userSchema.methods.getToken = function () {
  return sign({ id: this._id }, Config.JWT_SECRET as string, {
    expiresIn: Config.JWT_EXPIRE_TIME,
  });
};

const User = model<IUserDocument>("User", userSchema);

export default User;
