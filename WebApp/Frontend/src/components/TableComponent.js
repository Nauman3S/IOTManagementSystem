import React from "react";
import { Card, Table } from "antd";

const TableComponent = ({ mqttLoading, mqttData, macAddress, role }) => {
  let tableData = mqttData?.data?.data;
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
    },
  ];

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
