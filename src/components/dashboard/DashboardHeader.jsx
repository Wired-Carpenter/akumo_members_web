import React from "react";

import { Row, Button } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export const DashboardHeader = () => {
  const history = useHistory();
  return (
    <Row
      align="middle"
      justify="space-between"
      style={{ height: "8%", backgroundColor: "#844186" }}
    >
      <div onClick={() => history.push("/")}>
        <img src="images/logo.jpeg" height={80} />
        <b style={{ color: "white ", fontSize: "24px", marginLeft: "35px" }}>
          aKumo Members
        </b>
      </div>
      <Row align="middle">
        <span style={{ color: "white", fontSize: "16px", marginRight: "35px" }}>
          Logged in as: Admin
        </span>

        <BarsOutlined
          style={{ fontSize: "30px", color: "white", marginRight: "35px" }}
        />
        <Button style={{ marginRight: "35px" }}>Logout</Button>
      </Row>
    </Row>
  );
};
