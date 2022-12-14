import React from "react";
import { Card, Table } from "antd";

const TableComponent = ({
  selectedMacaddress,
  setSelectedMacaddress,
  mqttLoading,
  mqttData,
}) => {
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
            dataSource={!mqttLoading && mqttData?.data?.data}
            pagination={true}
          />
        </div>
      </Card>
    </>
  );
};
export default TableComponent;
