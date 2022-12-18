import { model, Schema, Types } from "mongoose";
import { IUrls } from "../types/types";

const urlSchema = new Schema<IUrls>(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    url: { type: String },
    macAddress: { type: String },
  },
  { timestamps: true }
);

const Url = model<IUrls>("Url", urlSchema);
export default Url;
