import { blue, bold, yellow } from "colors";
import express, { Express } from "express";
import config from "./config";
import database from "./database";
import middlewares from "./middlewares";
import apiRoutes from "./routes/routes";
import http from "http";
import { Server } from "socket.io";
import { postToMqtt } from "./controllers/mqtt.controller";

const app: Express = express();
const PORT: number = parseInt(config.PORT as string, 10);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://smart-iot-management-system.prod.dev-pci.com",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("User Connection established", socket.id);
  postToMqtt(socket);
});

//Initializing Middlewares
middlewares(app);

//Initialize Routes
app.use("/api", apiRoutes);
//Frontend Build Route

//Database Connection
database();

//Listening to PORT
server.listen(PORT, (): void =>
  console.log(`${blue("Server Running On PORT: ")} ${bold(
    blue(`${config.PORT}`)
  )}
${yellow("API URL: ")} ${blue(`http://localhost:${config.PORT}/api`)}`)
);
