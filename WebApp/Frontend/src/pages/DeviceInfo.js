import { useState } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  message,
  Select,
  Input,
} from "antd";
import SelectComponent from "../components/SelectComponent";
import MqttComponent from "../components/MqttComponent";

import { publishToMqtt } from "../Axios/apiFunctions";

const Control = ({ socket }) => {
  const { Option } = Select;

  const [selectedMacaddress, setSelectedMacaddress] = useState();
  const [selectedConfig, setSelectedConfig] = useState();
  const [config, setConfig] = useState();

  const configs = [
    "command;[bash command]",
    "logs=stdout",
    "logs=stdout-user-script",
    "logs=stderr",
    "logs=stderr-user-script",
    "logs=update-status",
  ];

  const onClickConfigPublish = async () => {
    if (!selectedMacaddress) {
      message.error("Please Select Macaddress First!");
      return;
    }
    if (!selectedConfig) {
      message.error("Please Select a Config to Publish!");
      return;
    }
    if (selectedConfig === configs[0] && !config) {
      message.error("Please Enter Config!");
      return;
    }
    try {
      const configEndPoint = `config/${
        selectedMacaddress === "All" ? "all" : selectedMacaddress
      }`;
      const formData = new FormData();
      formData.append(
        "message",
        selectedConfig === configs[0] ? `command;${config}` : selectedConfig
      );
      formData.append("endPoint", configEndPoint);
      const res = await publishToMqtt(formData);

      if (res.status === 200) {
        message.success("Published Successfully!");
      }
    } catch (error) {
      message.error(
        "Something went wrong, please check your internet connection!"
      );
    }
  };

  const onClickPublish = async (publishName) => {
    if (!selectedMacaddress) {
      message.error("Please Select Macaddress First!");
      return;
    }

    try {
      const publishEndPoint = `${publishName}/${
        selectedMacaddress === "All" ? "all" : selectedMacaddress
      }`;
      const formData = new FormData();
      formData.append("message", publishName);
      formData.append("endPoint", publishEndPoint);
      const res = await publishToMqtt(formData);

      if (res.status === 200) {
        message.success(`Published to ${selectedMacaddress} is Successfull!`);
      }
    } catch (error) {
      message.error(
        "Something went wrong, please check your internet connection!"
      );
    }
  };
  return (
    <>
      <Row gutter={[24, 0]} style={{ justifyContent: "center" }}>
        <Col span={24} md={24} className='mb-24'>
          <Card
            bordered={false}
            title={
              <>
                <h6 className='font-semibold m-0'>Controls</h6>
                <SelectComponent
                  setSelectedMacaddress={setSelectedMacaddress}
                />
              </>
            }
            className='header-solid h-full card-profile-information'
            bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
            <hr />

            <Descriptions
              style={{ alignItems: "center", justifyContent: "center" }}>
              <Descriptions.Item style={{ position: "absolute", width: "80%" }}>
                <Select
                  defaultValue={"Select Config"}
                  style={{
                    width: "24%",
                  }}
                  dropdownStyle={{ borderRadius: "20px" }}
                  onChange={(value) => {
                    setSelectedConfig(value);
                  }}>
                  {configs?.map((val) => (
                    <Option key={val} value={val}>
                      {val}
                    </Option>
                  ))}
                </Select>
              </Descriptions.Item>
              {selectedConfig === configs[0] && (
                <Descriptions.Item>
                  <Input
                    onChange={(e) => {
                      setConfig(e.target.value);
                    }}
                    placeholder={"Enter Config"}
                    style={{ width: "50%", color: "black" }}
                  />
                </Descriptions.Item>
              )}
              <Descriptions.Item
                label='Publish Config'
                labelStyle={{
                  alignItems: "center",
                  color: "#000",
                  fontSize: "15px",
                  fontWeight: "900",
                }}>
                <Button
                  type='primary'
                  className='tag-primary'
                  onClick={onClickConfigPublish}>
                  Publish
                </Button>
              </Descriptions.Item>
            </Descriptions>
            <hr />
            <Descriptions
              style={{ alignItems: "center", justifyContent: "center" }}>
              <Descriptions.Item
                label='Publish Upgrade'
                labelStyle={{
                  alignItems: "center",
                  color: "#000",
                  fontSize: "15px",
                  fontWeight: "900",
                }}
                style={{ position: "absolute", width: "80%" }}>
                <Button
                  type='primary'
                  className='tag-primary'
                  onClick={() => onClickPublish("upgrade")}>
                  Upgrade
                </Button>
              </Descriptions.Item>
              <Descriptions.Item
                label='Publish OSUG'
                labelStyle={{
                  alignItems: "center",
                  color: "#000",
                  fontSize: "15px",
                  fontWeight: "900",
                }}>
                <Button
                  type='primary'
                  className='tag-primary'
                  onClick={() => onClickPublish("osug")}>
                  OSUG
                </Button>
              </Descriptions.Item>
            </Descriptions>

            <hr />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: 30,
              }}>
              <MqttComponent
                socket={socket}
                selectedMacaddress={selectedMacaddress}
              />
              <Button
                type='primary'
                className='tag-primary'
                style={{
                  width: "50%",
                  alignSelf: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
                onClick={() => onClickPublish("info")}>
                Get Device Info
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Control;
