import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import {
  YoutubeOutlined,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

function Footer() {
  return (
    <AntFooter style={{ background: "#0d111d", color: "white", padding: "24px 48px" }}>
      <Row justify="space-between" align="middle">
        <Col xs={24} md={6} style={{ textAlign: "center", marginBottom: "12px" }}>
          <Text style={{ color: "white", fontSize: 12 }}>
            ©2022 All Rights Reserved.
          </Text>
        </Col>

        <Col xs={24} md={6} style={{ textAlign: "center", marginBottom: "12px" }}>
          <Space size="large">
            <YoutubeOutlined style={{ fontSize: 20, color: "white", cursor: "pointer" }} />
            <TwitterOutlined style={{ fontSize: 20, color: "white", cursor: "pointer" }} />
            <FacebookFilled style={{ fontSize: 20, color: "white", cursor: "pointer" }} />
          </Space>
        </Col>

        <Col xs={24} md={6} style={{ textAlign: "center" }}>
          <Space size="large">
            <Link style={{ color: "white" }} href="#">Contact us</Link>
            <Link style={{ color: "white" }} href="#">Privacy Policies</Link>
            <Link style={{ color: "white" }} href="#">Help</Link>
          </Space>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
