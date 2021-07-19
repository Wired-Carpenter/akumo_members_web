import React from "react";

import { Menu, Row, Button } from "antd";
import { TeamOutlined, FormOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { SubMenu } = Menu;

export const DashboardSidebar = () => {
  const history = useHistory();
  return (
    <Menu
      className="dashboard_sidebar"
      onClick={() => {}}
      style={{ width: "100%", height: "100%" }}
      defaultSelectedKeys={[]}
      defaultOpenKeys={[]}
      mode="inline"
    >
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
          <p>AKUMO</p>
          <p>SOLUTIONS</p>
        </div>
      </Row>
      {/* <Menu.Item key="4"> */}
      <Row align="middle" justify="center" style={{ marginTop: "24px" }}>
        <Button
          htmlType="button"
          shape="round"
          className="members_element"
          icon={<TeamOutlined style={{ fontSize: 24 }} />}
          onClick={() => history.push("/members")}
          style={{ height: "60px", width: "80%" }}
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
          style={{ height: "60px", width: "80%" }}
        >
          <span>Form manager</span>
        </Button>
      </Row>
      {/* </Menu.Item> */}
    </Menu>
  );
};
