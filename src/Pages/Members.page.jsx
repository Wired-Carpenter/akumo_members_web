import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table, Checkbox, Input, Tabs } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import qs from "query-string";

import {
  SearchOutlined,
  CheckOutlined,
  CloseOutlined,
  UserAddOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

// Components
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";

//
import { axios } from "../core/axios";

const { TabPane } = Tabs;

export const MembersPage = () => {
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

  const toggleSelectedId = (id) => {
    if (selectedIds.includes(id))
      setSelectedIds(selectedIds.filter((i) => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const fetchMembers = async (q) => {
    const query = { ...pagination };
    if (q) query.q = q;
    const members = await axios.get(`/members?${qs.stringify(query)}`);
    setData(members?.data?.data);
    setPagination({ ...pagination, total: members?.data?.count || 1 });
  };

  useEffect(() => {
    fetchMembers(q);
  }, [q]);

  const addMember = async () => {
    await axios.post("/members");
    fetchMembers();
  };

  const changeState = async (id, field, value) => {
    const result = await axios.post("/members/changeState", {
      id,
      [field]: value,
    });
    await fetchMembers();
  };

  const downloadXLSX = async () => {
    const result = await axios.post("/members/xlsx", {
      selectedIds,
      downloadSelected: toDownloadSelected,
    });
    const { base64 } = result.data;
    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
    const downloadLink = document.createElement("a");
    const fileName = "members.xlsx";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
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
        style={{ backgroundColor: "white", paddingLeft: 40, paddingRight: 40 }}
      >
        <Row justify="space-between" style={{ marginTop: 80 }}>
          <Col>
            <p style={{ fontWeight: "bold", fontSize: "38px", float: "left" }}>
              Members
            </p>
          </Col>
          <Col style={{ flexGrow: "1" }}></Col>
          <Col>
            <Row align="middle">
              <UserAddOutlined
                style={{ fontSize: 28, color: "#1f7bbf", marginRight: 30 }}
                onClick={addMember}
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
            <TabPane tab="All members" key="1"></TabPane>
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
                title: "Member ID",
                key: 1,
                render: (item) => {
                  return (
                    <div onDoubleClick={() => setEditing(true)}>{item.id}</div>
                  );
                },
              },
              {
                title: "First Name",
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
                        <div onDoubleClick={() => setEditing(true)}>
                          {item.first_name}
                        </div>
                      )}
                    </>
                  );
                },
              },
              {
                title: "Last Name",
                key: 2,
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
                        <div onDoubleClick={() => setEditing(true)}>
                          {item.last_name}
                        </div>
                      )}
                    </>
                  );
                },
              },
              {
                title: "Status",
                key: 2,
                render: (item) => (
                  <Row justify="center" align="middle">
                    <Checkbox
                      className="members_table_checkbox"
                      className="members_table_checkbox"
                      checked={item.status}
                      onChange={(e) =>
                        changeState(item.id, "status", e.target.checked)
                      }
                    />
                  </Row>
                ),
              },
              {
                title: "Slack",
                key: 2,
                render: (item) => (
                  <Row justify="center" align="middle">
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.slack}
                      onChange={(e) =>
                        changeState(item.id, "slack", e.target.checked)
                      }
                    />
                  </Row>
                ),
              },
              {
                title: "Teachable",
                key: 2,
                render: (item) => (
                  <Row justify="center" align="middle">
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.teachable}
                      onChange={(e) =>
                        changeState(item.id, "teachable", e.target.checked)
                      }
                    />
                  </Row>
                ),
              },
              {
                title: "Linux",
                key: 2,
                render: (item) => (
                  <Row justify="center" align="middle">
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.linux}
                      onChange={(e) =>
                        changeState(item.id, "linux", e.target.checked)
                      }
                    />
                  </Row>
                ),
              },
              {
                title: "AWS",
                key: 2,
                render: (item) => (
                  <Row justify="center" align="middle">
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.aws}
                      onChange={(e) =>
                        changeState(item.id, "aws", e.target.checked)
                      }
                    />
                  </Row>
                ),
              },
              {
                title: "Ansible",
                key: 2,
                render: (item) => (
                  <Row justify="center" align="middle">
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.ansible}
                      onChange={(e) =>
                        changeState(item.id, "ansible", e.target.checked)
                      }
                    />
                  </Row>
                ),
              },
              {
                title: "Terraform",
                key: 2,
                render: (item) => (
                  <Row justify="center" align="middle">
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.terraform}
                      onChange={(e) =>
                        changeState(item.id, "terraform", e.target.checked)
                      }
                    />
                  </Row>
                ),
              },
              {
                title: "Git",
                key: 2,
                render: (item) => (
                  <Row justify="center" align="middle">
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.git}
                      onChange={(e) =>
                        changeState(item.id, "git", e.target.checked)
                      }
                    />
                  </Row>
                ),
              },
              {
                title: "Cloudformation",
                key: 2,
                render: (item) => (
                  <Row justify="center" align="middle">
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.cloudformation}
                      onChange={(e) =>
                        changeState(item.id, "cloudformation", e.target.checked)
                      }
                    />
                  </Row>
                ),
              },
              {
                title: "Career coaching",
                key: 2,
                render: (item) => (
                  <Row justify="center" align="middle">
                    <Checkbox
                      className="members_table_checkbox"
                      checked={item.career_coaching}
                      onChange={(e) =>
                        changeState(
                          item.id,
                          "career_coaching",
                          e.target.checked
                        )
                      }
                    />
                  </Row>
                ),
              },
            ]}
          />
        </Row>
        <Row justify="start">
          <Col span={4}>
            <Row justify="center" align="middle">
              <Checkbox
                checked={toDownloadSelected}
                onChange={(e) => setToDownloadSelected(e.target.checked)}
              >
                checked members
              </Checkbox>
            </Row>
            <Row justify="center" align="middle">
              <Button
                htmlType="button"
                shape="round"
                className="downloadxlsx_button"
                icon={<DownloadOutlined />}
                onClick={downloadXLSX}
              >
                <span> Download XLSX</span>
              </Button>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
