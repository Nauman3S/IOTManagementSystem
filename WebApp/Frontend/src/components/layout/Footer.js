import { Layout, Row, Col } from "antd";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className='just'>
        <Col xs={24} md={12} lg={12}>
          <div className='copyright'>
            © 2022 -
            <a href='#pablo' className='font-weight-bold' target='_blank'>
              Smart IoT Management System
            </a>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
