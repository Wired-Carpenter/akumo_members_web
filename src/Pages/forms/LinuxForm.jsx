import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Radio,
  Space,
  Modal,
  Divider,
} from "antd";
import { useLocation, useHistory } from "react-router-dom";
import qs from "query-string";
import moment from "moment";

import { axios } from "../../core/axios";

const { useForm } = Form;

const FormTitle = ({ title, required }) => {
  return (
    <p style={{ marginTop: 6 }}>
      {title}
      {required && <span style={{ color: "red", marginLeft: 2 }}>*</span>}:
    </p>
  );
};

export const LinuxForm = () => {
  const [form] = useForm();
  const history = useHistory();
  const location = useLocation();
  const qry = qs.parse(location.search);
  const [formInfo, setFormInfo] = useState(null);

  useEffect(() => {
    const fn = async () => {
      if (qry.t) {
        const { data } = await axios.get("/form/check", {
          params: {
            token: qry.t,
          },
        });
        console.log("result", data);
        const { not_started, expired, result } = data;
        if (expired) {
          Modal.warn({
            title: "Expired form",
            content: "Sorry, this form is expired.",
            onOk: () => history.push("/"),
          });
        } else if (not_started) {
          Modal.warn({
            title: "Registration not started",
            content: "Sorry, registration is not yet started",
            onOk: () => history.push("/"),
          });
        } else {
          setFormInfo(result);
        }
      } else {
        history.push("/");
      }
    };
    fn();
  }, []);

  const FormTypeImage = () => {
    const { type } = formInfo || {};
    let img = null;
    let title = null;
    switch (type) {
      case "linux":
        img = "/images/linux_logo.png";
        title = "Linux";
        break;
      default:
        break;
    }

    return (
      <Row align="middle" justify="center">
        <div>
          <p style={{ textAlign: "center", fontSize: 24 }}>{title}</p>
          <img src={img} width={110} height={110} />
        </div>
      </Row>
    );
  };

  const onFinish = async (values) => {
    console.log(values);

    const result = await axios.post("/form/linux", {
      ...values,
      form_id: formInfo.id,
    });

    form.resetFields();
    Modal.info({
      title: "Request submitted",
      content: (
        <Row>
          <div>
            <p>Thank you!</p>
            <p>We look forward to process your request.</p>
            <p>
              For additional questions or informatino, please contact us at:
              <a>support@akumosolutions.io</a>.
            </p>
            <p>Best Regards,</p>
            <p>aKumoSolutions Team</p>
          </div>
        </Row>
      ),
      onOk: () => history.push("/"),
    });
  };

  return (
    <Row justify="center" align="center" className="indexPage_body">
      <div
        style={{
          margin: "60px",
          padding: "90px",
          borderRadius: "25px",
          width: "50%",
          backgroundColor: "white",
        }}
      >
        <Row align="middle" justify="center">
          <img src="/images/logo.jpeg" width={160} height={160} />
          <Row justify="center" style={{ width: "100%" }}>
            <p className="formHeader">aKumo Solutions</p>
          </Row>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <FormTypeImage />
          </Col>
          <Col span={12}>
            <div style={{ fontSize: "18px" }}>
              <p>
                Start Date: {moment(formInfo?.start_date).format("YYYY-MM-DD")}
              </p>
              <p>End Date: {moment(formInfo?.end_date).format("YYYY-MM-DD")}</p>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row justify="center" style={{ width: "100%" }}>
          <div
            style={{ textAlign: "center", color: "#3996cb", fontSize: "30px" }}
          >
            <p style={{ fontWeight: 500 }}>Register</p>
          </div>
        </Row>
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <FormTitle title="First name" required />
            </Col>
            <Col span={24}>
              <Form.Item
                name="first_name"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormTitle title="Last name" required />
            </Col>
            <Col span={24}>
              <Form.Item
                name="last_name"
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormTitle title="Gender" required />
            </Col>
            <Col span={24} offset={2}>
              <Form.Item
                name="gender"
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="none">Prefer not to say</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormTitle title="Phone number" required />
            </Col>
            <Col span={24}>
              <Form.Item
                name="phone_number"
                rules={[
                  { required: true, message: "Phone number is required" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormTitle title="Email address" required />
            </Col>
            <Col span={24}>
              <Form.Item
                validateFirst
                name="email_address"
                rules={[
                  { required: true, message: "Email address is required" },
                  { type: "email", message: "Must be a valid email address" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormTitle title="Home city" required />
            </Col>
            <Col span={24}>
              <Form.Item
                name="home_city"
                rules={[{ required: true, message: "Home city is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormTitle title="You are" required />
            </Col>
            <Col span={19} offset={2}>
              <Form.Item
                name="you_are"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="it_professional">IT Professional</Radio>
                    <Radio value="non_it_professional">
                      Non-IT Professional
                    </Radio>
                    <Radio value="student">Student</Radio>
                    <Radio value="other">Other</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormTitle title="How did you hear about us?" required />
            </Col>
            <Col span={19} offset={2}>
              <Form.Item
                name="info_source"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="social_media">
                      aKumoSolutions Social Media Platforms
                    </Radio>
                    <Radio value="website">aKumoSolutions Website</Radio>
                    <Radio value="friends">Friends</Radio>
                    <Radio value="other">Other</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormTitle title="Do you personally know any aKumoSolutions partners?" />
            </Col>
            <Col span={19} offset={2}>
              <Form.Item
                name="partner"
                // rules={[{ required: true, message: "This field is required" }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormTitle
                title={`If answered "Yes", please provide the name of the partner.`}
              />
            </Col>
            <Col span={24}>
              <Form.Item
                name="partner_name"
                // rules={[{ required: true, message: "Title is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Button
              htmlType="button"
              onClick={() => form.submit()}
              shape="round"
              className="loginForm_submitButton"
              type="primary"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Submit
            </Button>
          </Row>
        </Form>
      </div>
    </Row>
  );
};
