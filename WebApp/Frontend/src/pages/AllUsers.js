import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Popconfirm,
  message,
  Typography,
  Tooltip,
  Input,
  Modal,
  Form,
} from "antd";

import { deleteUser, getAllUsers } from "../Axios/apiFunctions";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../Redux/actions/auth.actions";

const { Paragraph } = Typography;

const AllUsers = () => {
  const { loading, data } = useQuery("getAllUsers", getAllUsers);
  const authState = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState({
    show: false,
    email: "",
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(getAllUsers, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getAllUsers");
    },
  });
  const handlePasswordView = (email) => {
    if (showPassword.show) {
      setShowPassword({
        show: false,
        email: email,
      });
    } else {
      setShowPassword({
        show: true,
        email: email,
      });
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "32%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Password",
      key: "visiblePassword",
      render: (data) => (
        <>
          {showPassword.show && data.email === showPassword.email ? (
            <Tooltip title={"Click agian to hide password"} placement='bottom'>
              <Paragraph
                onClick={() => {
                  handlePasswordView(data.email);
                }}
                style={{ cursor: "pointer" }}
                copyable>
                {data.visiblePassword}
              </Paragraph>
            </Tooltip>
          ) : (
            <Tooltip title={"Click to show password"} placement='bottom'>
              <Paragraph
                onClick={() => {
                  handlePasswordView(data.email);
                }}
                style={{ fontWeight: "bold", cursor: "pointer" }}>
                ********
              </Paragraph>
            </Tooltip>
          )}
        </>
      ),
      hidden: authState.role === "superAdmin" ? true : false,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
            onConfirm={() => handleDelete(data)}>
            <Button type='danger' className='tag-primary'>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
      hidden: authState.role === "superAdmin" ? true : false,
    },
  ].filter((item) => !item.hidden);

  const handleDelete = async (values) => {
    const res = await deleteUser(values._id);

    if (res.status === 200) {
      getDataMutation.mutate();
      message.success("User Deleted Successfully");
    } else {
      message.success(
        "Something went wrong, please check your internet connection!"
      );
    }
  };

  const handleAddNewUser = async (values) => {
    values.role = "client";
    setConfirmLoading(true);
    form.resetFields();

    const newValues = { ...values, visiblePassword: values.password };

    const res = await dispatch(signUp(newValues));

    if (res.status === 200) {
      getDataMutation.mutate();
      setConfirmLoading(false);
      setVisible(false);

      message.success("New User Added Succssfully!");
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
              title='All Users'
              extra={
                <>
                  <Button
                    type='primary'
                    className='tag-primary'
                    onClick={() => setVisible(true)}>
                    Add User
                  </Button>
                </>
              }>
              <div className='table-responsive'>
                <Table
                  columns={columns}
                  dataSource={loading || data?.data?.users}
                  pagination={false}
                  className='ant-border-space'
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        title='Create New User'
        destroyOnClose={true}
        open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleAddNewUser}
          labelCol={{
            span: 8,
          }}>
          <Form.Item
            name='fullName'
            label='Client Full Name'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Client Email'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AllUsers;
