import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Descriptions,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/user.png";
import { updateUser } from "../Axios/apiFunctions";
import { getToken } from "../Redux/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../Redux/actions/auth.actions";

const Profile = () => {
  const authState = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const token = getToken();

  const handleAddUpdateProfile = async (value) => {
    setConfirmLoading(true);

    try {
      const res = await updateUser(value);
      if (res.status === 200) {
        setConfirmLoading(false);
        setVisible(false);
        dispatch(loadProfile(token));
        message.success("Profile updated successfully!");
      }
    } catch (error) {
      setConfirmLoading(false);
      setVisible(false);
      message.error(
        "Something went wrong, please check your internet connection"
      );
    }
  };

  return (
    <>
      <div
        className='profile-nav-bg'
        style={{ backgroundImage: "url(" + BgProfile + ")" }}></div>

      <Card
        className='card-profile-head'
        bodyStyle={{ display: "none" }}
        title={
          <Row justify='space-between' align='middle' gutter={[24, 0]}>
            <Col span={24} md={12} className='col-info'>
              <Avatar.Group>
                <Avatar size={74} shape='square' src={profilavatar} />

                <div className='avatar-info'>
                  <h4 className='font-semibold m-0'>{authState.fullName}</h4>
                  <p>{authState.email}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }></Card>
      <Row gutter={[24, 0]} style={{ justifyContent: "center" }}>
        <Col span={24} md={8} className='mb-24'>
          <Card
            bordered={false}
            title={<h6 className='font-semibold m-0'>Profile Information</h6>}
            className='header-solid h-full card-profile-information'
            bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
            extra={
              <>
                {
                  <Button
                    type='primary'
                    className='tag-primary'
                    icon={<EditOutlined />}
                    onClick={() => setVisible(true)}>
                    Edit
                  </Button>
                }
              </>
            }>
            <hr />
            <Descriptions>
              <Descriptions.Item label='Full Name' span={3}>
                {authState.fullName}
              </Descriptions.Item>

              <Descriptions.Item label='Email' span={3}>
                {authState.email}
              </Descriptions.Item>
              <Descriptions.Item label='Role' span={3}>
                {authState.role}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <Modal
        title='Edit Profile'
        destroyOnClose={true}
        open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleAddUpdateProfile}
          labelCol={{
            span: 8,
          }}>
          <Form.Item
            name='fullName'
            label='Full Name'
            initialValue={authState.fullName}
            rules={[
              {
                required: true,
              },
            ]}>
            <Input placeholder='Full Name' />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            initialValue={authState.email}
            rules={[
              {
                required: true,
              },
            ]}>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='password'
            label='New Password'
            initialValue={authState.visiblePassword}
            rules={[
              {
                required: true,
              },
            ]}>
            <Input.Password
              placeholder='New Password'
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Profile;
