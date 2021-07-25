import React from "react";
import { Button, Row, Col, message } from "antd";
import { useHistory } from "react-router-dom";
import "../css/pages/index.page.less";

// Components
import { LoginForm } from "../components/index/LoginForm";

import { axios } from "../core/axios";

export const IndexPage = () => {
  const history = useHistory();

  const onLoginFinish = async (values) => {
    try {
      const { data } = await axios.post("/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.success) history.push("/admin");
    } catch (error) {
      message.error("Login failed.");
    }
  };

  return (
    <Row justify="center" align="center" className="indexPage_body">
      <div
        style={{
          margin: "60px",
          padding: "90px",
          borderRadius: "25px",
          width: "35%",
          backgroundColor: "white",
        }}
      >
        <Row align="middle" justify="center">
          <img src="/images/logo.jpeg" width={160} height={160} />
        </Row>
        <Row justify="center" style={{ width: "100%", marginTop: "20px" }}>
          <p className="formHeader">SIGN IN</p>
        </Row>

        <Row style={{ marginTop: "15px", width: "100%" }}>
          <Col span={24}>
            <LoginForm onFinish={onLoginFinish} />
          </Col>
        </Row>
      </div>
    </Row>
  );
};
