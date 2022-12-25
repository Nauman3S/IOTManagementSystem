import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Input,
  Modal,
  message,
  Popconfirm,
} from "antd";

import {
  addUrl,
  allUrls,
  publishToMqtt,
  deleteUrl,
  editUrl,
} from "../Axios/apiFunctions";
import { useQuery, useMutation, useQueryClient } from "react-query";
import SelectComponent from "../components/SelectComponent";
import MqttComponent from "../components/MqttComponent";

const ClientFirmware = ({ socket }) => {
  const [visible, setVisible] = useState({
    visible: false,
    type: "add",
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedMacaddress, setSelectedMacaddress] = useState();
  const [editProgramId, setEditProgramId] = useState({});
  const [form] = Form.useForm();

  const { data, loading } = useQuery(
    ["url", selectedMacaddress],
    () =>
      selectedMacaddress &&
      allUrls(selectedMacaddress === "All" ? "" : selectedMacaddress)
  );
  const columns = [
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      width: "32%",
    },

    {
      title: "Publish",
      key: "run",
      width: "1%",
      render: (data) => (
        <>
          <Button
            type='primary'
            className='tag-primary'
            onClick={() => {
              hanldeRunProgram(data);
            }}>
            Publish
          </Button>
        </>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      width: "1%",

      render: (data) => (
        <>
          <Button
            type='primary'
            className='tag-primary'
            onClick={() => {
              handleEditProgram(data);
            }}>
            Edit
          </Button>
        </>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      width: "20%",

      render: (data) => (
        <>
          <Popconfirm
            title='Are you sure to delete this task?'
            onConfirm={() => {
              handleDeleteProgram(data);
            }}
            // onCancel={cancel}
            okText='Yes'
            cancelText='No'>
            <Button type='danger' className='tag-primary'>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDeleteProgram = async (data) => {
    const res = await deleteUrl(data._id);

    if (res.status === 200) {
      getDataMutation.mutate();
      message.success(`${data.programName} Deleted`);
    } else {
      message.error(
        `Something went wrong, please check your internet connection`
      );
    }
  };
  const handleEditProgram = (data) => {
    form.setFieldsValue({
      programName: data.programName,
      command: data.command,
    });
    setEditProgramId(data._id);
    setVisible({ visible: true, type: "edit" });
  };

  const hanldeRunProgram = async (data) => {
    try {
      const urlFileEndPoint = `firmware/url/${
        selectedMacaddress === "All" ? "all" : selectedMacaddress
      }`;
      const formDataUrl = new FormData();
      formDataUrl.append("message", data.url);
      formDataUrl.append("endPoint", urlFileEndPoint);

      const res = await publishToMqtt(formDataUrl);
      if (res.status === 200) {
        message.success(`${data.url} Published`);
      }
    } catch (error) {
      message.error(
        `Something went wrong, please check your internet connection`
      );
    }
  };

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(allUrls, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["url", selectedMacaddress]);
    },
  });

  const handleAddProgram = async (values) => {
    setConfirmLoading(true);
    let res;
    const newValues = { ...values, macAddress: selectedMacaddress };
    try {
      if (visible.type === "edit") {
        res = await editUrl(newValues, editProgramId);
      } else {
        res = await addUrl(newValues);
      }
      if (res.status === 200) {
        message.success(
          `Program ${
            visible.type === "edit" ? "Updated" : "Added"
          } Succssfully!`
        );
        getDataMutation.mutate();
        setConfirmLoading(false);
        setVisible({ visible: false, type: "add" });
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
      setConfirmLoading(false);
      setVisible({ visible: false, type: "add" });
    }
  };

  const onClickAddURL = () => {
    if (!selectedMacaddress) {
      message.error("Please select macaddress first");
      return;
    }
    setVisible({ visible: true, type: "add" });
  };
  return (
    <>
      <div className='tabled'>
        <Row gutter={[24, 0]}>
          <Col xs='24' xl={24}>
            <Card
              bordered={false}
              className='criclebox tablespace mb-24'
              title={
                <>
                  <h4>URLs Table</h4>
                  <SelectComponent
                    setSelectedMacaddress={setSelectedMacaddress}
                  />
                </>
              }
              extra={
                <>
                  <Button
                    type='primary'
                    className='tag-primary'
                    onClick={onClickAddURL}>
                    Add URL
                  </Button>
                </>
              }>
              <div className='table-responsive'>
                <Table
                  columns={columns}
                  dataSource={loading || data?.data?.data}
                  pagination={false}
                  className='ant-border-space'
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title={`${visible.type === "add" ? "Add New" : "Edit"}  URL`}
        destroyOnClose={true}
        open={visible.visible}
        footer={null}
        onCancel={() => setVisible({ visible: false })}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          form={form}
          onFinish={handleAddProgram}
          labelCol={{
            span: 8,
          }}>
          <Form.Item
            name='url'
            label='URL'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input placeholder='Enter URL' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <MqttComponent socket={socket} selectedMacaddress={selectedMacaddress} />
    </>
  );
};

export default ClientFirmware;
