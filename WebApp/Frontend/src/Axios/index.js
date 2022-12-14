import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3500/api",
  baseURL: "https://smart-iot-management-system-backend.prod.dev-pci.com/api",

  //   baseURL: process.env.REACT_APP_API,
});
