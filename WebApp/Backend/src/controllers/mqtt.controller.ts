import { Request, Response } from "express";
import { Mqtt, File } from "../models";
import { connect } from "../libraries/mqtt";
import { uploadFile, deleteFile } from "../libraries/multer";
import { promisify } from "util";
import fs from "fs";

const mqttClient: any = connect();

/**
 * Data from Mqtt
 */
//@ts-ignore
export const postToMqtt = async (socket) => {
  try {
    mqttClient.on("message", async (topic: string, payload: any) => {
      let message = JSON.parse(payload);
      console.log("Received Message:", topic, message);

      if (topic.includes("/logs")) {
        socket.emit("send_message", payload.toString());
        return;
      }

      if (topic.includes("/heartbeat")) {
        socket.emit("heartbeat", payload.toString());
      }

      await Mqtt.findOneAndUpdate(
        { macAddress: message.macAddress },
        { macAddress: message.macAddress, status: message.status },
        { upsert: true }
      );
    });
    console.log("Data Saved");
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * Publish Data to MQtt
 * @param {Request} req - request object
 * @param {Response} res - response object
 */

export const publishToMqtt = async (req: Request, res: Response) => {
  try {
    const topic: string = `iotm-sys/device/${req?.body.endPoint}`;

    mqttClient.publish(
      topic,
      req?.body?.message,
      { qos: 0, retain: false },
      (error: Error) => {
        if (error) {
          console.error(error as Error);
        }
      }
    );

    return res.status(200).json({ message: "Data Published" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get Data By MacAdress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
export const getDataByMacAddress = async (req: Request, res: Response) => {
  try {
    const data = await Mqtt.find(req.body.query);
    return res.status(200).json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Upload File
 * @param {Request} req
 * @param {Request} req
 */

export const uploadFileToS3 = async (req: Request, res: Response) => {
  try {
    const unlinkFile = promisify(fs.unlink);

    const file = req?.file as Express.Multer.File;

    const result: any = await uploadFile(file);
    unlinkFile(file.path);

    const ota = await File.create({
      userId: req?.user?._id,
      fileURL: result.Location,
      fileName: file?.originalname,
      macAddress: req?.body?.macAddress,
      type: req?.body?.type,
      key: result.Key,
    });
    ota.save();

    return res.status(200).json({ message: "File Uploaded", data: ota });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Upload File
 * @param {Request} req
 * @param {Request} req
 */

export const deleteFileFromS3 = async (req: Request, res: Response) => {
  try {
    // const { Key }: { Key: string } = req?.body;

    //Deleting File from S3
    await deleteFile(req?.params.key);

    //Deleting File from DB
    await File.findOneAndDelete({ key: req.params.key });

    return res.status(200).json({ message: "File Deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};

/**
 * Get All Files
 * @param {Request} req
 * @param {Request} req
 */
export const getAllFiles = async (req: Request, res: Response) => {
  try {
    console.log(req?.body?.query);
    const files = await File.find(req?.body?.query);
    return res.status(200).json({ files });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR: ${(error as Error).message}` });
  }
};
