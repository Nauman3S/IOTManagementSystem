import { blue } from "colors";
import { connect, ConnectOptions } from "mongoose";
import config from "../config";

const options =
  (process.env.NODE_ENV === "development" && {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) ||
  (process.env.NODE_ENV === "production" && {
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
export default async function () {
  await connect(config.MONGO_URI ?? "", options as ConnectOptions, () => {
    try {
      console.log(blue(`DB connected ✅`));
    } catch (error) {
      console.log(error);
    }
  });
}
