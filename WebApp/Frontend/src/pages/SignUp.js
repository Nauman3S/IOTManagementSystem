import React, { useState, useRef, useEffect } from "react";
import { Layout, Button, Typography, Card, Form, Input } from "antd";
import logo from "../assets/images/smartoee.png";
import { signUp } from "../Redux/actions/auth.actions";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignUp = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BtnRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [didMount, setDidMount] = useState(false);

  const onFinish = async (values) => {
    form.resetFields();
    BtnRef.current.blur();

    setLoading(true);

    const res = await dispatch(signUp(values));
    if (!res) {
      navigate("/sign-in");
    }
    setLoading(false);
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
  return (
    <>
      <div className='layout-default ant-layout layout-sign-up'>
        <Header>
          <div className='header-col header-brand'>
            <h5> Smart IoT Management System</h5>
          </div>
        </Header>

        <Content className='p-0'>
          <div className='sign-up-header'>
            <div className='content'>
              <Title>Sign Up</Title>
            </div>
          </div>

          <Card
            className='card-signup header-solid h-full ant-card pt-0'
            title={
              <>
                <div className='sign-up-gateways'>
                  <img
                    src={logo}
                    alt='logo'
                    style={{
                      width: 120,
                      borderRadius: 50,
                    }}
                  />
                </div>
                <h2 className='my-h2'>SignUp</h2>
              </>
            }
            bordered='false'>
            <Form
              name='basic'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className='row-col'>
              <Form.Item
                name='fullName'
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}>
                <Input placeholder='Name' />
              </Form.Item>
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}>
                <Input placeholder='Email' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}>
                <Input.Password placeholder='Password' />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type='primary'
                  loading={loading}
                  ref={BtnRef}
                  htmlType='submit'>
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
            <p className='font-semibold text-muted text-center'>
              Already have an account?{" "}
              <NavLink to='/sign-in' className='font-bold text-dark'>
                Sign In
              </NavLink>
            </p>
          </Card>
        </Content>
        <Footer>
          <p className='copyright'>
            Copyright © 2022 Smart IoT Management System
          </p>
        </Footer>
      </div>
    </>
  );
};
export default SignUp;
