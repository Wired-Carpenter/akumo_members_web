import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Table, Button, Checkbox, Divider } from "antd";
import { axios } from "../../core/axios";

export const FormMembersModal = ({ visible, data = {}, onHide }) => {
  const { title, type, imgSrc } = data;
  const [forms, setForms] = useState([]);
  const [formMebers, setFormMembers] = useState([]);
  const [formId, setFormId] = useState();

  const getForms = async () => {
    try {
      const { data } = await axios.get(`/form/${type}`);
      console.log(data);
      setForms(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (visible) {
      getForms();
    }
  }, [visible]);

  const chooseForm = async (formId) => {
    const { data } = await axios.get("/form/members", {
      params: {
        formId: formId,
        type,
      },
    });
    setFormId(formId);
    setFormMembers(data);
  };

  const changeState = async (id, field, value) => {
    await axios.post("/form/members/update", {
      id,
      field,
      value,
      type,
    });
    chooseForm(formId);
  };
  return (
    <Modal
      style={{ borderRadius: 25 }}
      title={`${title} MEMBERS`}
      visible={visible}
      onCancel={onHide}
      width={1300}
      footer={null}
    >
      <Row>
        <Col span={4}>
          <Row
            justify="center"
            style={{ marginTop: 15, marginBottom: 40, fontSize: 20 }}
          >
            Forms
          </Row>
          {forms.map((form, key) => (
            <Button
              htmlType="button"
              shape="round"
              style={{
                width: "90%",
                marginBottom: 15,
                backgroundColor: "#1f7bbf",
                color: "white",
              }}
              key={key}
              onClick={() => chooseForm(form.id)}
            >
              {form.title}
            </Button>
          ))}
        </Col>
        <Col span={20}>
          <Table
            className="members_table"
            style={{ width: "100%" }}
            style={{ minHeight: 500 }}
            pagination={false}
            dataSource={formMebers}
            columns={[
              {
                title: "First Name",
                key: 0,
                render: (item) => {
                  return (
                    <div onDoubleClick={() => setEditing(true)}>
                      {item.first_name}
                    </div>
                  );
                },
              },
              {
                title: "Last Name",
                key: 1,
                render: (item) => {
                  return (
                    <div onDoubleClick={() => setEditing(true)}>
                      {item.last_name}
                    </div>
                  );
                },
              },
              {
                title: "Gender",
                key: 2,
                render: (item) => {
                  return (
                    <div onDoubleClick={() => setEditing(true)}>
                      {item.gender}
                    </div>
                  );
                },
              },
              {
                title: "Phone Number",
                key: 3,
                render: (item) => {
                  return (
                    <div onDoubleClick={() => setEditing(true)}>
                      {item.phone_number}
                    </div>
                  );
                },
              },
              {
                title: "Email Address",
                key: 4,
                render: (item) => {
                  return (
                    <div onDoubleClick={() => setEditing(true)}>
                      {item.email_address}
                    </div>
                  );
                },
              },
              {
                title: "Home city",
                key: 3,
                render: (item) => {
                  return (
                    <div onDoubleClick={() => setEditing(true)}>
                      {item.home_city}
                    </div>
                  );
                },
              },
              {
                title: "You are:",
                key: 3,
                render: (item) => {
                  return (
                    <div onDoubleClick={() => setEditing(true)}>
                      {(item.you_are || "").replace(/_/g, " ")}
                    </div>
                  );
                },
              },
              {
                title: "Billable",
                key: 3,
                render: (item) => {
                  return (
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.billable}
                      onChange={(e) =>
                        changeState(item.id, "billable", e.target.checked)
                      }
                    />
                  );
                },
              },
              {
                title: "Paid",
                key: 3,
                render: (item) => {
                  return (
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.paid}
                      onChange={(e) =>
                        changeState(item.id, "paid", e.target.checked)
                      }
                    />
                  );
                },
              },
            ]}
          />
        </Col>
      </Row>
    </Modal>
  );
};
