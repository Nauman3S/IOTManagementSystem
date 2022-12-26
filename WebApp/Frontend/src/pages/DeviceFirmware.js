import React from "react";

import ClientFirmware from "./ClientFirmware";

const DeviceFirmware = ({ socket, type }) => {
  return <ClientFirmware socket={socket} type={type} />;
};

export default DeviceFirmware;
