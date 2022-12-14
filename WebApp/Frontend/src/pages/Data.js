import React, { useState } from "react";
import { Button, Card, Table } from "antd";

const Data = () => {
  const [visible, setVisible] = useState(false);
  const [sensors, setSensors] = useState(false);

  const columns = [
    {
      title: "Sensors",
      key: "sensors",
      width: "90%",
      render: (data) => data,
    },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        title='Sensor Names'
        headStyle={{ fontWeight: "bold" }}
        extra={
          <>
            {
              <Button
                type='primary'
                className='tag-primary'
                onClick={() => setVisible(true)}>
                Add New Sensors
              </Button>
            }
          </>
        }
        style={{ width: "100%" }}>
        <div className='table-responsive'>
          <Table
            columns={columns}
            dataSource={sensors}
            pagination={false}
            className='ant-border-space'
          />
        </div>
      </Card>
    </div>
  );
};

export default Data;
