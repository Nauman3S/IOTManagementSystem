import { useEffect } from "react";

import { Row, Col, Breadcrumb, Button } from "antd";

import { NavLink, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { ProfileSideNavSvg, TogglerSvg } from "../../assets/Icons";

function Header({ name, subName, onPress }) {
  useEffect(() => window.scrollTo(0, 0));

  const authState = useSelector((state) => state.auth);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to='/'>Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", "")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className='ant-page-header-heading'>
            <span
              className='ant-page-header-heading-title'
              style={{ textTransform: "capitalize" }}>
              {subName.replace("/", "")}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className='header-control'>
          <Button
            type='link'
            className='sidebar-toggler'
            onClick={() => onPress()}>
            <TogglerSvg />
          </Button>

          <Link to='/profile' className='btn-sign-in'>
            <ProfileSideNavSvg color={"#111827"} />
            <span>{authState.fullName}</span>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default Header;
