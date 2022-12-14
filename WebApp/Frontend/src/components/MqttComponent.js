import React, { useState, useEffect } from "react";
import { Input } from "antd";

const { TextArea } = Input;

const MqttComponent = ({ socket, selectedMacaddress }) => {
  const [logs, setLogs] = useState("Logs");

  const [didMount, setDidMount] = useState(false);

  socket.on("send_message", (data) => {
    const logsData = JSON.parse(data);
    if (logsData) {
      setLogs(logsData);
    }
  });

  useEffect(() => {
    setDidMount(true);

    return () => {
      setDidMount(false);
      socket.off("send_message");
    };
  }, [socket]);
  if (!didMount) {
    return null;
  }

  return (
    <div style={{ marginBotton: 50, textAlign: "center" }}>
      <TextArea
        rows={4}
        placeholder='Logs'
        disabled
        value={
          selectedMacaddress === logs.macAddress ? JSON.stringify(logs) : "Logs"
        }
        style={{ color: "red", width: "80%" }}
      />
    </div>
  );
};

export default MqttComponent;
