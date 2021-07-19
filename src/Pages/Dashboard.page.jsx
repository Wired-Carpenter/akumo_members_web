import React, { useState } from "react";
import { Button, Row, Col, Collapse } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

// Components
import { DashboardHeader } from "../components/dashboard/DashboardHeader";

const Batch = ({ title, imgSrc }) => {
  const [showCollapse, setShowCollapse] = useState(false);
  const months = [0, 1, 2, 3, 4, 5, 6].map((e) =>
    moment().add(e, "month").format("YYYY/MM")
  );
  return (
    <Col span={8} style={{ padding: "20px" }}>
      <Button
        htmlType="button"
        shape="round"
        className="members_element"
        icon={imgSrc ? <img src={imgSrc} height={24} className="mr-5" /> : null}
        onClick={() => setShowCollapse(!showCollapse)}
        style={{ height: "60px", width: "100%" }}
      >
        <span>{title}</span>
      </Button>
      {showCollapse && (
        <Collapse>
          {months.map((m, idx) => (
            <Panel header={m} key={idx}>
              <p>Coming soon</p>
            </Panel>
          ))}
        </Collapse>
      )}
    </Col>
  );
};

export const DashboardPage = () => {
  const history = useHistory();

  return (
    <Row justify="center" align="center" className="indexPage_body">
      <div
        style={{
          margin: "50px",
          padding: "30px",
          borderRadius: "25px",
          width: "70%",
          backgroundColor: "white",
        }}
      >
        <Row align="middle" justify="center">
          <img
            src="images/logo.jpeg"
            width={160}
            height={160}
            onClick={() => history.push("/")}
          />
        </Row>
        <Row justify="center" style={{ width: "100%", marginTop: "50px" }}>
          <Button
            htmlType="button"
            shape="round"
            className="loginForm_submitButton"
            onClick={() => history.push("/members")}
            type="primary"
            icon={<TeamOutlined style={{ fontSize: 24 }} />}
            style={{ marginTop: "50px" }}
          >
            <span>Members</span>
          </Button>
        </Row>

        <Row style={{ marginTop: 110, width: "100%" }}>
          <Col span={24}>
            <Row justify="center">
              {[
                { title: "LINUX", imgSrc: "images/linux_logo.png" },
                {
                  title: "DOCKER",
                  imgSrc: "images/docker_kubernetes_logo.png",
                },
                { title: "TERRAFORM", imgSrc: "images/terraform_logo.png" },
                { title: "ANSIBLE", imgSrc: "images/ansible_logo.png" },
                { title: "AWS", imgSrc: "images/aws_logo.png" },
                { title: "JENKINS", imgSrc: "images/jenkins_logo.png" },
              ].map((e, idx) => (
                <Batch {...e} key={idx} />
              ))}
            </Row>
          </Col>
        </Row>
      </div>
      <Button
        htmlType="button"
        shape="round"
        className="loginForm_submitButton"
        type="primary"
        icon={<UserOutlined style={{ fontSize: 16 }} />}
        style={{ position: "absolute", top: 50, right: 20 }}
      >
        <span>Admin</span>
      </Button>
    </Row>
  );
};
