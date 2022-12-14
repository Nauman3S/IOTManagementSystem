import { model, Schema, Types } from "mongoose";
import { IScripts } from "../types/types";

const scriptSchema = new Schema<IScripts>(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    programName: { type: String },
    command: { type: String },
    macAddress: { type: String },
  },
  { timestamps: true }
);

const Script = model<IScripts>("Script", scriptSchema);
export default Script;
