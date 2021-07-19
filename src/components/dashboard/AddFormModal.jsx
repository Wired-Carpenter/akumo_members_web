import React, { useEffect } from "react";
import { Row, Col, Modal, Form, Input, DatePicker, Select } from "antd";

const { useForm } = Form;
const { Option } = Select;

const FormTitle = ({ title }) => {
  return <p style={{ marginTop: 6 }}>{title}:</p>;
};

export const AddFormModal = ({
  visible,
  editData = {},
  hide = () => {},
  onFinish = () => {},
}) => {
  const [form] = useForm();
  useEffect(() => {
    if (visible) form.resetFields();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      title={editData ? "Edit Form" : "Add Form"}
      okText={editData ? "Edit" : "Add"}
      onCancel={hide}
      onOk={() => form.submit()}
    >
      <Form initialValues={editData} form={form} onFinish={onFinish}>
        <Row>
          <Col span={5}>
            <FormTitle title="Title" />
          </Col>
          <Col span={19}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <FormTitle title="Type" />
          </Col>
          <Col span={19}>
            <Form.Item
              name="type"
              rules={[{ required: true, message: "Please select a type" }]}
            >
              <Select>
                <Option value="linux">Linux</Option>
                <Option value="terraform" disabled>
                  Terraform
                </Option>
                <Option value="jenkins" disabled>
                  Jenkins
                </Option>
                <Option value="aws" disabled>
                  AWS
                </Option>
                <Option value="ansible" disabled>
                  Ansible
                </Option>
                <Option value="docker" disabled>
                  Docker
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <FormTitle title="Start date" />
          </Col>
          <Col span={19}>
            <Form.Item
              name="start_date"
              rules={[
                { required: true, message: "Please select a start date" },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <FormTitle title="End date" />
          </Col>
          <Col span={19}>
            <Form.Item
              name="end_date"
              rules={[{ required: true, message: "Please select an end date" }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
