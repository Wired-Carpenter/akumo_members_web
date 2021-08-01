import React, { useState } from "react";
import { Button, Row, Col, Collapse } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

// Components
import { FormMembersModal } from "../components/dashboard/FormMembersModal";

const Batch = ({ showModal, ...props }) => {
  const { title, disabled, imgSrc } = props;
  return (
    <Col span={8} style={{ padding: "20px" }}>
      <Button
        htmlType="button"
        shape="round"
        className="members_element"
        disabled={disabled}
        icon={imgSrc ? <img src={imgSrc} height={24} className="mr-5" /> : null}
        onClick={() => showModal(props)}
        style={{ height: "60px", width: "100%" }}
      >
        <span>{title}</span>
      </Button>
    </Col>
  );
};

export const DashboardPage = () => {
  const history = useHistory();
  const [formMembersModalVisible, setFormMembersModalVisible] = useState(false);
  const [formMembersModalData, setFormMembersModalData] = useState(null);

  const showModal = (props) => {
    console.log(props);
    setFormMembersModalVisible(true);
    setFormMembersModalData(props);
  };
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
                {
                  title: "LINUX",
                  type: "linux",
                  imgSrc: "images/linux_logo.png",
                },
                {
                  title: "DOCKER",
                  disabled: true,
                  imgSrc: "images/docker_kubernetes_logo.png",
                },
                {
                  title: "TERRAFORM",
                  disabled: true,
                  imgSrc: "images/terraform_logo.png",
                },
                {
                  title: "ANSIBLE",
                  disabled: true,
                  imgSrc: "images/ansible_logo.png",
                },
                { title: "AWS", disabled: true, imgSrc: "images/aws_logo.png" },
                {
                  title: "JENKINS",
                  disabled: true,
                  imgSrc: "images/jenkins_logo.png",
                },
              ].map((e, idx) => (
                <Batch {...e} key={idx} showModal={showModal} />
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
      {formMembersModalVisible && (
        <FormMembersModal
          visible={formMembersModalVisible}
          data={formMembersModalData}
          onHide={() => setFormMembersModalVisible(false)}
        />
      )}
    </Row>
  );
};
