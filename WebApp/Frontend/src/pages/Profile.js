import React from "react";
import { Row, Col, Card, Descriptions, Avatar } from "antd";
import { useSelector } from "react-redux";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/user.png";

const Profile = () => {
  const authState = useSelector((state) => state.auth);

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
            bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
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
    </>
  );
};

export default Profile;
