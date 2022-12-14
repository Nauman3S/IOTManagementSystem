"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./database"));
const middlewares_1 = __importDefault(require("./middlewares"));
const routes_1 = __importDefault(require("./routes/routes"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mqtt_controller_1 = require("./controllers/mqtt.controller");
const app = (0, express_1.default)();
const PORT = parseInt(config_1.default.PORT, 10);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        // origin: "http://localhost:3000",
        origin: "https://smart-iot-management-system.prod.dev-pci.com",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("User Connection established", socket.id);
    (0, mqtt_controller_1.postToMqtt)(socket);
});
//Initializing Middlewares
(0, middlewares_1.default)(app);
//Initialize Routes
app.use("/api", routes_1.default);
//Frontend Build Route
//Database Connection
(0, database_1.default)();
//Listening to PORT
server.listen(PORT, () => console.log(`${(0, colors_1.blue)("Server Running On PORT: ")} ${(0, colors_1.bold)((0, colors_1.blue)(`${config_1.default.PORT}`))}
${(0, colors_1.yellow)("API URL: ")} ${(0, colors_1.blue)(`http://localhost:${config_1.default.PORT}/api`)}`));
