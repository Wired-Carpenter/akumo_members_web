import React, { useState } from "react";
import { Button, Row, Col, Collapse } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";

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
        type="primary"
        icon={imgSrc ? <img src={imgSrc} height={24} className="mr-5" /> : null}
        style={{ height: "60px", width: "100%" }}
        onClick={() => setShowCollapse(!showCollapse)}
      >
        {title}
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
    <div style={{ height: "100vh", width: "100%" }}>
      <DashboardHeader />
      <Row justify="center" style={{ width: "100%", height: "92%" }}>
        <Col span={22} style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold", fontSize: "24px" }}>General</p>
          <Row justify="center">
            <Button
              type="primary"
              icon={<img src="images/logo.jpeg" height={24} className="mr-5" />}
              style={{ height: "60px", width: "500px" }}
              onClick={() => history.push("/members")}
            >
              MEMBERS
            </Button>
          </Row>
        </Col>
        <Col span={22} style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold", fontSize: "24px" }}>Batches</p>
          <Row justify="center">
            {[
              { title: "LINUX", imgSrc: "images/linux_logo.png" },
              { title: "AWS", imgSrc: "images/aws_logo.png" },
              { title: "ANSIBLE", imgSrc: "images/ansible_logo.png" },
              { title: "TERRAFORM", imgSrc: "images/terraform_logo.png" },
              {
                title: "DOCKER/KUBERNETES",
                imgSrc: "images/docker_kubernetes_logo.png",
              },
              { title: "JENKINS", imgSrc: "images/jenkins_logo.png" },
            ].map((e, idx) => (
              <Batch {...e} key={idx} />
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
