import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Popconfirm,
  message,
  Form,
  Input,
  Modal,
} from "antd";

import {
  getAdminUserAllMacAddress,
  getAllMacAddress,
  removeMacAddress,
  addMacAddress,
} from "../Axios/apiFunctions";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";

const MacAddress = () => {
  const authState = useSelector((state) => state.auth);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [macList, setMacList] = useState(false);
  const { data: macAddress, loading } = useQuery(
    authState.role && authState.role === "client"
      ? "getAllMacAddress"
      : " getAdminUserAllMacAddress",
    authState?.role && authState?.role === "client"
      ? getAllMacAddress
      : getAdminUserAllMacAddress
  );

  useEffect(() => {
    if (!loading) {
      if (authState?.role === "client") {
        setMacList(macAddress?.data?.macAddressess.macAddress);
      } else if (authState?.role === "admin") {
        setMacList(macAddress?.data?.macAddressess);
      }
    }
  }, [loading, macAddress, authState.role]);
  const columns = [
    authState?.role === "admin"
      ? {
          title: "MacAddress",
          dataIndex: "macAddress",
          key: "macAddress",
          width: "32%",
          render: (data) => data.macAddress,
        }
      : {
          title: "MacAddress",
          dataIndex: "macAddress",
          key: "macAddress",
          width: "32%",
        },

    {
      title: "Delete",
      key: "delete",
      render: (data) => (
        <>
          <Popconfirm
            title='Are you sure？'
            okText='Yes'
            cancelText='No'
            onConfirm={() =>
              handleDeleteMacAddress(
                authState?.role === "admin" ? data.macAddress : data,
                data._id
              )
            }>
            <Button type='danger' className='tag-primary'>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(
    authState?.role && authState?.role === "client"
      ? getAllMacAddress
      : getAdminUserAllMacAddress,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(
          authState?.role && authState.role === "client"
            ? "getAllMacAddress"
            : " getAdminUserAllMacAddress"
        );
      },
    }
  );
  const getMacAddressMutation = useMutation(getAllMacAddress, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getAllMacAddress");
    },
  });

  const handleAddMacAddress = async (values) => {
    setConfirmLoading(true);
    const res = await addMacAddress(values.macAddress);
    if (res.status === 200) {
      getMacAddressMutation.mutate();
      message.success("MacAddress added successfully!");
      setVisible(false);
      setConfirmLoading(false);
    }
  };

  const handleDeleteMacAddress = async (data, userid) => {
    const res = await removeMacAddress(data.macAddress, userid);
    if (res.status === 200) {
      getDataMutation.mutate();
      message.success("MacAddress Deleted!");
    } else {
      message.error(
        "Something went wrong, please check your internet connection!"
      );
    }
  };

  return (
    <>
      <div className='tabled'>
        <Row gutter={[24, 0]}>
          <Col xs='24' xl={24}>
            <Card
              bordered={false}
              className='criclebox tablespace mb-24'
              title={"MacAddress"}
              extra={
                <>
                  {!(authState.role === "admin") && (
                    <Button
                      type='primary'
                      className='tag-primary'
                      onClick={() => setVisible(true)}>
                      {authState.role === "client" && "Add New MacAddress"}
                    </Button>
                  )}
                </>
              }>
              <div className='table-responsive'>
                <Table
                  columns={columns}
                  dataSource={!loading && macList}
                  pagination={false}
                  className='ant-border-space'
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title='Add New MacAddress'
        destroyOnClose={true}
        open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleAddMacAddress}
          labelCol={{
            span: 8,
          }}>
          <Form.Item
            name='macAddress'
            label='MacAddress'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MacAddress;
