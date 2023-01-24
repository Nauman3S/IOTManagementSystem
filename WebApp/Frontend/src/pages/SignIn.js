import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Modal,
  notification,
} from "antd";
import signinbg from "../assets/images/smartoee.png";
import { useDispatch } from "react-redux";
import { signIn } from "../Redux/actions/auth.actions";
import {
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../Axios/apiFunctions";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const btnRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [email, setEmail] = useState(false);
  const [didMount, setDidMount] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    btnRef.current.blur();
    const res = await dispatch(signIn(values));
    setLoading(false);

    if (!res) {
      navigate("/");
    }
  };
  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleForgotPassword = async ({ password }) => {
    setConfirmLoading(true);

    try {
      const res = await resetPassword(email, password);
      if (res.status === 200) {
        notification.success({
          message: "Success",
          description: res.data.message,
        });
        setPasswordModalVisible(false);

        setConfirmLoading(false);
      }
    } catch (error) {
      setConfirmLoading(false);

      notification.error({
        message: "Error",
        description: error.response.data.message,
      });
    }
  };
  const handleEmailModal = async ({ email }) => {
    setEmail(email);
    setConfirmLoading(true);

    try {
      const res = await forgotPassword(email);
      if (res.status === 200) {
        notification.success({
          message: "OTP Sent",
          description: res.data.message,
        });
        setEmailModalVisible(false);

        setOtpModalVisible(true);
        setConfirmLoading(false);
      }
    } catch (error) {
      setEmailModalVisible(false);
      setConfirmLoading(false);

      notification.error({
        message: "Error",
        description: error.response.data.message,
      });
    }
  };
  const handleOTP = async ({ otp }) => {
    setConfirmLoading(true);

    try {
      const res = await verifyOTP(email, otp);
      if (res.status === 200) {
        notification.success({
          message: "OTP Status",
          description: res.data.message,
        });
        setOtpModalVisible(false);

        setPasswordModalVisible(true);
        setConfirmLoading(false);
      }
    } catch (error) {
      setConfirmLoading(false);

      notification.error({
        message: "Error",
        description: error.response.data.message,
      });
    }
  };

  return (
    <>
      <Layout className='layout-default layout-signin'>
        <Header>
          <div className='header-col header-brand'>
            <h5> Smart IoT Management System</h5>
          </div>
        </Header>
        <Content className='signin'>
          <Row gutter={[24, 0]} justify='space-around'>
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}>
              <Title className='mb-15'>Sign In</Title>
              <Title className='font-regular text-muted' level={5}>
                Enter your email and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout='vertical'
                className='row-col'>
                <Form.Item
                  className='username'
                  label='Email'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}>
                  <Input placeholder='Email' />
                </Form.Item>

                <Form.Item
                  className='username'
                  label='Password'
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}>
                  <Input.Password placeholder='Password' />
                </Form.Item>

                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    loading={loading}
                    ref={btnRef}
                    style={{ width: "100%" }}>
                    SIGN IN
                  </Button>
                </Form.Item>
                <p className='font-semibold text-muted'>
                  <br />
                  <div
                    onClick={() => setEmailModalVisible(true)}
                    className='text-dark font-bold'
                    style={{ textDecoration: "underline", cursor: "pointer" }}>
                    Forgot Password?
                  </div>
                </p>
              </Form>
            </Col>
            <Col
              className='sign-img'
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}>
              <img src={signinbg} alt='' />
            </Col>
          </Row>
        </Content>
        <Footer>
          <p className='copyright'>
            Copyright © 2022 Smart IoT Management System
          </p>
        </Footer>
      </Layout>
      <Modal
        title='Enter Email'
        destroyOnClose={true}
        open={emailModalVisible}
        footer={null}
        onCancel={() => setEmailModalVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleEmailModal}
          style={{ alignItems: "center" }}
          labelCol={{
            span: 4,
          }}>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              {
                required: true,
                message:
                  "Please enter your email address associated with your account!",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}>
            <Input />
          </Form.Item>

          <br />
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Next
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Enter OTP'
        destroyOnClose={true}
        open={otpModalVisible}
        footer={null}
        onCancel={() => setOtpModalVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleOTP}
          labelCol={{
            span: 4,
          }}>
          <Form.Item
            name='otp'
            label='OTP'
            rules={[
              {
                required: true,
                message: "Please enter OTP you  received!",
              },
            ]}>
            <Input />
          </Form.Item>

          <br />
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Next
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Enter New Password'
        destroyOnClose={true}
        open={passwordModalVisible}
        footer={null}
        onCancel={() => setPasswordModalVisible(false)}
        confirmLoading={confirmLoading}>
        <Form
          name='control-ref'
          onFinish={handleForgotPassword}
          labelCol={{
            span: 8,
          }}>
          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='confirm'
            label='Confirm Password'
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>

          <br />
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={confirmLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignIn;
