import { model, Schema, Types } from "mongoose";
import { ISensorsName } from "../types/types";

const sensorValueSchema = new Schema<ISensorsName>(
  {
    macAddress: { type: String },
    userId: { type: Types.ObjectId, ref: "User" },
    sensorName: { type: String },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SensorValue = model<ISensorsName>("SensorValue", sensorValueSchema);
export default SensorValue;
