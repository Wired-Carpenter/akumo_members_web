import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table, Checkbox, Input, Tabs, Modal } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import {
  UserOutlined,
  FileAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import qs from "query-string";
import moment from "moment";

import {
  SearchOutlined,
  CheckOutlined,
  CloseOutlined,
  UserAddOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

// Components
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { AddFormModal } from "../components/dashboard/AddFormModal";

//
import { axios } from "../core/axios";

const { TabPane } = Tabs;

export const FormManagerPage = () => {
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [toDownloadSelected, setToDownloadSelected] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const qry = qs.parse(location.search);
  const { q, page = 1, size = 20 } = qry;
  const [pagination, setPagination] = useState({
    total: 1,
  });

  const [search, setSearch] = useState(q);

  const [showAddFormModal, setShowAddFormModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const toggleSelectedId = (id) => {
    if (selectedIds.includes(id))
      setSelectedIds(selectedIds.filter((i) => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const fetchForms = async (q) => {
    const query = { ...pagination };
    if (q) query.q = q;
    const members = await axios.get(`/forms?${qs.stringify(query)}`);
    setData(members?.data?.data);
    setPagination({ ...pagination, total: members?.data?.count || 1 });
  };

  useEffect(() => {
    fetchForms(q);
  }, [q]);

  const changeState = async (id, field, value) => {
    const result = await axios.post("/members/changeState", {
      id,
      [field]: value,
    });
    await fetchForms();
  };

  const addForm = async (values) => {
    console.log(values);
    const { start_date, end_date, ..._values } = values;
    const result = await axios.post("/forms", {
      ..._values,
      start_date: moment(start_date).startOf("day").format("YYYY-MM-DD HH:mm"),
      end_date: moment(end_date).endOf("day").format("YYYY-MM-DD HH:mm"),
    });
    setShowAddFormModal(false);
    await fetchForms();
  };

  return (
    <>
      <Row
        justify="center"
        style={{ width: "100%", minHeight: "100vh" }}
        className="indexPage_body"
      >
        <Col span={4}>
          <DashboardSidebar />
        </Col>
        <Col
          span={20}
          style={{
            backgroundColor: "white",
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          <Row justify="space-between" style={{ marginTop: 80 }}>
            <Col>
              <p
                style={{ fontWeight: "bold", fontSize: "38px", float: "left" }}
              >
                SignUp Form Manager
              </p>
            </Col>
            <Col style={{ flexGrow: "1" }}></Col>
            <Col>
              <Row align="middle">
                <FileAddOutlined
                  style={{ fontSize: 28, color: "#1f7bbf", marginRight: 30 }}
                  onClick={() => setShowAddFormModal(true)}
                />

                <SearchOutlined
                  style={{ fontSize: 28, color: "#1f7bbf" }}
                  onClick={() =>
                    history.push({
                      pathname: location.pathname,
                      search: qs.stringify({ q: search }),
                    })
                  }
                />
                <Input
                  style={{ width: "180px", marginRight: 30 }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                  shape="circle"
                  shape="round"
                  type="primary"
                  icon={<UserOutlined style={{ fontSize: 16 }} />}
                  onClick={() => history.push("/admin")}
                >
                  <span>Admin</span>
                </Button>
              </Row>
            </Col>
          </Row>
          <Row justify="space-between">
            <Tabs defaultActiveKey="1" size={32}>
              <TabPane tab="All forms" key="1"></TabPane>
              <TabPane tab="Linux" key="2"></TabPane>
              <TabPane tab="Terraform" key="3"></TabPane>
              <TabPane tab="Jenkins" key="4"></TabPane>
              <TabPane tab="AWS" key="5"></TabPane>
              <TabPane tab="Ansible" key="6"></TabPane>
              <TabPane tab="Docker" key="7"></TabPane>
            </Tabs>
          </Row>
          <Row justify="center">
            <Table
              className="members_table"
              style={{ width: "100%" }}
              dataSource={data}
              rowKey="id"
              pagination={{
                pageSize: size,
                current: page,
                total: pagination.total,
                showSizeChanger: true,
                onChange: (page, size) =>
                  history.push({
                    pathname: location.pathname,
                    search: qs.stringify({ ...qry, page, size }),
                  }),
              }}
              columns={[
                {
                  title: "Select",
                  key: 0,
                  render: (item) => {
                    return (
                      <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelectedId(item.id)}
                      />
                    );
                  },
                },
                {
                  title: "Type",
                  key: 1,
                  render: (item) => (
                    <Row justify="center" align="middle">
                      <span>{item.type}</span>
                    </Row>
                  ),
                },
                {
                  title: "Name",
                  key: 2,
                  render: (item) => {
                    const [editing, setEditing] = useState(false);
                    const [firstName, setFirstName] = useState(item.first_name);
                    useEffect(() => {
                      if (editing) setFirstName(item.first_name);
                    }, [editing]);
                    return (
                      <>
                        {editing ? (
                          <div>
                            <input
                              value={firstName}
                              className="mr-5"
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Button
                              icon={<CloseOutlined />}
                              className="mr-5"
                              onClick={() => {
                                setEditing(false);
                                setLastName(item.first_name);
                              }}
                            ></Button>
                            <Button
                              icon={<CheckOutlined />}
                              onClick={() => {
                                changeState(item.id, "first_name", firstName);
                                setEditing(false);
                                setLastName(item.first_name);
                              }}
                            ></Button>
                          </div>
                        ) : (
                          <div onDoubleClick={() => setEditing(false)}>
                            {item.title}
                          </div>
                        )}
                      </>
                    );
                  },
                },
                {
                  title: "Start Date",
                  key: 3,
                  render: (item) => {
                    const [editing, setEditing] = useState(false);

                    const [lastName, setLastName] = useState(item.last_name);
                    useEffect(() => {
                      if (editing) setLastName(item.last_name);
                    }, [editing]);

                    return (
                      <>
                        {editing ? (
                          <div>
                            <input
                              value={lastName}
                              className="mr-5"
                              onChange={(e) => setLastName(e.target.value)}
                            />
                            <Button
                              icon={<CloseOutlined />}
                              className="mr-5"
                              onClick={() => {
                                setEditing(false);
                                setLastName(item.last_name);
                              }}
                            ></Button>
                            <Button
                              icon={<CheckOutlined />}
                              onClick={() => {
                                changeState(item.id, "last_name", lastName);
                                setEditing(false);
                                setLastName(item.last_name);
                              }}
                            ></Button>
                          </div>
                        ) : (
                          <div onDoubleClick={() => setEditing(false)}>
                            {moment(item.start_date).format("YYYY-MM-DD")}
                          </div>
                        )}
                      </>
                    );
                  },
                },
                {
                  title: "End Date",
                  key: 4,
                  render: (item) => (
                    <Row justify="center" align="middle">
                      {moment(item.end_date).format("YYYY-MM-DD")}
                    </Row>
                  ),
                },
                {
                  title: "Status",
                  key: 5,
                  render: (item) => (
                    <Row justify="center" align="middle">
                      {item.status}
                    </Row>
                  ),
                },
                {
                  title: "Actions",
                  key: 6,
                  render: (item) => (
                    <Row justify="center" align="middle">
                      <EditOutlined
                        style={{
                          fontSize: 20,
                          color: "#1f7bbf",
                          marginRight: 30,
                        }}
                        onClick={() => {
                          setEditData({
                            ...item,
                            start_date: moment(item.start_date),
                            end_date: moment(item.end_date),
                          });
                          setShowAddFormModal(true);
                        }}
                      />
                      <DeleteOutlined
                        style={{
                          fontSize: 20,
                          color: "#1f7bbf",
                          marginRight: 30,
                        }}
                        onClick={() => {
                          Modal.confirm({
                            title: "Delete form",
                            content: "Are you sure?",
                          });
                        }}
                      />
                    </Row>
                  ),
                },
              ]}
            />
          </Row>
        </Col>
      </Row>
      {showAddFormModal && (
        <AddFormModal
          visible={showAddFormModal}
          editData={editData}
          hide={() => {
            setShowAddFormModal(false);
            setEditData(null);
          }}
          onFinish={addForm}
        />
      )}
    </>
  );
};
