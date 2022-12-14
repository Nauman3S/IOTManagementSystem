import { model, Schema, Types } from "mongoose";
import { IFile } from "../types/types";

const fileSchema = new Schema<IFile>(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    fileURL: { type: String },
    fileName: { type: String },
    key: { type: String },
    macAddress: { type: String },
  },
  { timestamps: true }
);

const File = model<IFile>("File", fileSchema);
export default File;
