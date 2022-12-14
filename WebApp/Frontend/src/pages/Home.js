import React from "react";

import { Card, Col, Row, Typography } from "antd";

import { useSelector } from "react-redux";

import ProfileSvg from "../assets/Icons/ProfileSvg";

import { ReadFilled, ControlFilled } from "@ant-design/icons";
import { getCounts } from "../Axios/apiFunctions";
import { useQuery } from "react-query";
import AllUsers from "./AllUsers";

function Home() {
  const { Title } = Typography;
  const authState = useSelector((state) => state.auth);

  const { data: counts } = useQuery("getCounts", getCounts);

  const cards = [
    {
      today: "Total Macaddress",
      title: counts?.data?.totalMacAddress,
      icon: <ReadFilled />,
      bnb: "bnb2",
    },

    {
      today: "Total Users",
      title: counts?.data?.users,

      icon: <ProfileSvg />,
      bnb: "bnb2",
    },
    {
      today: "Role",
      title: authState?.role.toUpperCase(),
      icon: <ControlFilled />,
      bnb: "redtext",
    },
  ];

  return (
    <>
      <div className='layout-content'>
        <Row
          className='rowgap-vbox'
          gutter={[24, 0]}
          style={{ justifyContent: "center" }}>
          {cards.map((c, index) => (
            <Col
              key={"Home" + index + c}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className='mb-24'>
              <Card bordered={false} className='criclebox '>
                <div className='number'>
                  <Row align='middle' gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={4}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className='icon-box'>{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <AllUsers />
      </div>
    </>
  );
}

export default Home;
