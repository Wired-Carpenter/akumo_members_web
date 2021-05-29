import React from "react";
import { Form, Input, Row, Button, Checkbox } from "antd";
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
      <Form.Item name="username">
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="password">
        <Input placeholder="Password" type="password" />
      </Form.Item>
      <Row justify="space-between">
        <Form.Item>
          <Checkbox> Remember me</Checkbox>
        </Form.Item>
        <a href="#" style={{ marginTop: "5px" }}>
          Forgot password?
        </a>
      </Row>
      <Row>
        <Button
          htmlType="button"
          onClick={() => form.submit()}
          type="primary"
          style={{ width: "100%" }}
        >
          Login
        </Button>
      </Row>
    </Form>
  );
};
