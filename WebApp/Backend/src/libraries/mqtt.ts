import mqtt from "mqtt";
import { blue, bold, yellow } from "colors";

const topic1 = "iotm-sys/device/logs/#";
const topic2 = "iotm-sys/device/heartbeat/#";
const host = "50.19.43.139";
// const host = "broker.hivemq.com";
const port = "1883";
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://${host}:${port}`;

export const connect = () => {
  try {
    let client = mqtt.connect(connectUrl, {
      username: "device",
      password: "device",
    });

    client.on("connect", () => {
      // if (!err) {
      console.log(bold(yellow("MQTT Connected")));
      client.subscribe(topic1, (err) => {
        if (!err) {
          console.log(
            `${bold("MQTT: ")}${blue(`Subscribed to ${bold(topic1)} ✅`)}`
          );
        }
      });

      client.subscribe(topic2, (err) => {
        if (!err) {
          console.log(
            `${bold("MQTT: ")}${blue(`Subscribed to ${bold(topic2)} ✅`)}`
          );
        }
      });
    });
    return client;
  } catch (error) {
    console.log(error);
  }
};
