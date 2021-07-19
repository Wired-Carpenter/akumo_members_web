import React from "react";
import { Form, Input, Row, Button, Checkbox, Col } from "antd";
import { useHistory } from "react-router-dom";

const { useForm } = Form;

export const LoginForm = () => {
  const [form] = useForm();
  const history = useHistory();

  return (
    <Form
      form={form}
      onFinish={() => {
        history.push("/admin");
      }}
    >
      <Row justify="center" style={{ width: "100%" }}>
        <Col span={20}>
          <p className="formTitle">username</p>
          <Form.Item name="username">
            <Input className="login-input" />
          </Form.Item>
          <p className="formTitle">password</p>
          <Form.Item name="password">
            <Input type="password" className="login-input" />
          </Form.Item>
          <Row justify="space-between">
            <Form.Item>
              <Checkbox className="text_blue">
                <span>remember me</span>
              </Checkbox>
            </Form.Item>
            <a href="#" style={{ marginTop: "7px" }}>
              forgot password?
            </a>
          </Row>
        </Col>
      </Row>
      <Row>
        <Button
          htmlType="button"
          shape="round"
          className="loginForm_submitButton"
          onClick={() => form.submit()}
          type="primary"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <span>CONTINUE</span>
        </Button>
      </Row>
    </Form>
  );
};
