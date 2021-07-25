import React from "react";

import { Row, Button } from "antd";
import { TeamOutlined, FormOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export const DashboardSidebar = () => {
  const history = useHistory();
  return (
    <div className="dashboard_sidebar">
      <Row align="middle" justify="center">
        <img
          src="images/logo_tp.png"
          width={160}
          height={160}
          onClick={() => history.push("/")}
        />
      </Row>
      <Row align="middle" justify="center" style={{ marginTop: "24px" }}>
        <div style={{ textAlign: "center", color: "white", fontSize: "24px" }}>
          <p style={{ marginBottom: 0 }}>AKUMO</p>
          <p>SOLUTIONS</p>
        </div>
      </Row>
      <Row align="middle" justify="center" style={{ marginTop: "24px" }}>
        <Button
          htmlType="button"
          shape="round"
          className="members_element"
          icon={<TeamOutlined style={{ fontSize: 24 }} />}
          onClick={() => history.push("/members")}
          style={{ height: "60px", width: "85%" }}
        >
          <span>Members</span>
        </Button>
      </Row>
      <Row align="middle" justify="center" style={{ marginTop: "24px" }}>
        <Button
          htmlType="button"
          shape="round"
          className="members_element"
          icon={<FormOutlined style={{ fontSize: 24 }} />}
          onClick={() => history.push("/form_manager")}
          style={{ height: "60px", width: "85%" }}
        >
          <span style={{ wordBreak: "break-word" }}>Form manager</span>
        </Button>
      </Row>
    </div>
  );
};
