import React, { useState, useEffect } from "react";
import { Card, Table } from "antd";

const TableComponent = ({
  mqttLoading,
  mqttData,
  macAddress,
  role,
  socket,
}) => {
  let tableData = mqttData?.data?.data;

  const [status, setStatus] = useState();
  const [didMount, setDidMount] = useState(false);

  socket.on("heartbeat", (data) => {
    const device = JSON.parse(data);
    if (device) {
      setStatus(device);
    }
  });

  useEffect(() => {
    setDidMount(true);

    return () => {
      setDidMount(false);
      socket.off("send_message");
    };
  }, [socket]);

  if (role === "client") {
    tableData = mqttData?.data?.data
      ?.map((data) => {
        if (
          macAddress?.data?.macAddressess?.macAddress?.find(
            (macAddress) => macAddress.macAddress === data.macAddress
          )?.macAddress
        ) {
          return data;
        }
      })
      .filter((data) => data !== undefined);
  }
  const columns = [
    {
      title: "MacAddress",
      dataIndex: "macAddress",
      key: "macAddress",
      width: "32%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (data, record) => {
        if (record?.macAddress === status?.macAddress) {
          return (
            <p
              style={
                status?.status === "online"
                  ? { color: "green", fontWeight: "900" }
                  : { color: "red", fontWeight: "900" }
              }>
              {status?.status}
            </p>
          );
        } else {
          return <p style={{ color: "red", fontWeight: "900" }}>{data}</p>;
        }
      },
    },
  ];
  if (!didMount) {
    return null;
  }
  return (
    <>
      <Card
        bordered={false}
        className='criclebox tablespace mb-24'
        title={<h3>Device Status</h3>}>
        <div className='table-responsive'>
          <Table
            className='ant-border-space'
            columns={columns}
            dataSource={!mqttLoading && tableData}
            pagination={true}
          />
        </div>
      </Card>
    </>
  );
};
export default TableComponent;
