import React from "react";
import { Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";

// Components
import { LoginForm } from "../components/index/LoginForm";

export const IndexPage = () => {
  const history = useHistory();

  return (
    <Row
      justify="center"
      style={{ width: "100%", height: "100vh", backgroundColor: "#844186" }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "white",
          margin: "60px",
          borderRadius: "5px",
        }}
      >
        <Row align="middle" style={{ marginLeft: "50px", height: "15%" }}>
          <img src="images/logo.jpeg" width={100} height={100} />
          <b style={{ color: "black", fontSize: "24px", marginLeft: "15px" }}>
            aKumo Members
          </b>
        </Row>
        <Row style={{ width: "100%", height: "85%" }}>
          <Col span={15}>
            <Row align="middle" justify="center" style={{ height: "100%" }}>
              <img
                src="images/index_body1.svg"
                style={{ width: "90%", margin: "10px", maxHeight: "90%" }}
              />
            </Row>
          </Col>
          <Col span={9}>
            <p
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "0px",
              }}
            >
              Hello,
            </p>
            <p style={{ fontSize: "36px", fontWeight: "bold" }}>Welcome back</p>

            <Row style={{ width: "80%", marginBottom: "20px" }}>
              <Col span={24}>
                <LoginForm />
              </Col>
            </Row>
            <Row>
              <p>
                Don't have an account? <a href="#">Click here</a>
              </p>
            </Row>

            <img
              src="images/appstore_playstore.png"
              height="45px"
              style={{ marginTop: "30px" }}
            />
          </Col>
        </Row>
      </div>
    </Row>
  );
};
