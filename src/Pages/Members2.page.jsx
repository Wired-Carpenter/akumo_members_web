import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table, Checkbox, Input, Pagination } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";

import {
  SearchOutlined,
  CheckOutlined,
  CloseOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

// Components
import { DashboardHeader } from "../components/dashboard/DashboardHeader";

//
import { axios } from "../core/axios";

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
    <div style={{ height: "100vh", width: "100%" }}>
      {/* <DashboardHeader /> */}
      <Row
        justify="center"
        style={{ width: "100%", height: "92%" }}
        className="indexPage_body"
      >
        <Col span={22} style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold", fontSize: "24px" }}>General</p>
          <Row justify="end" style={{ marginBottom: "5px" }}>
            <Row style={{ marginRight: "20px" }}>
              <Input
                style={{ width: "180px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                icon={<SearchOutlined />}
                type="primary"
                onClick={() =>
                  history.push({
                    pathname: location.pathname,
                    search: qs.stringify({ q: search }),
                  })
                }
              ></Button>
            </Row>
            <Button type="primary" onClick={addMember}>
              Add member
            </Button>
          </Row>
          <Row justify="center">
            <Table
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
                  title: false,
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
                      <div onDoubleClick={() => setEditing(true)}>
                        {item.id}
                      </div>
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
                    <div>
                      <Checkbox
                        checked={item.status}
                        onChange={(e) =>
                          changeState(item.id, "status", e.target.checked)
                        }
                      />
                    </div>
                  ),
                },
                {
                  title: "Slack",
                  key: 2,
                  render: (item) => (
                    <div>
                      <Checkbox
                        checked={item.slack}
                        onChange={(e) =>
                          changeState(item.id, "slack", e.target.checked)
                        }
                      />
                    </div>
                  ),
                },
                {
                  title: "Teachable",
                  key: 2,
                  render: (item) => (
                    <div>
                      <Checkbox
                        checked={item.teachable}
                        onChange={(e) =>
                          changeState(item.id, "teachable", e.target.checked)
                        }
                      />
                    </div>
                  ),
                },
                {
                  title: "Linux",
                  key: 2,
                  render: (item) => (
                    <div>
                      <Checkbox
                        checked={item.linux}
                        onChange={(e) =>
                          changeState(item.id, "linux", e.target.checked)
                        }
                      />
                    </div>
                  ),
                },
                {
                  title: "AWS",
                  key: 2,
                  render: (item) => (
                    <div>
                      <Checkbox
                        checked={item.aws}
                        onChange={(e) =>
                          changeState(item.id, "aws", e.target.checked)
                        }
                      />
                    </div>
                  ),
                },
                {
                  title: "Ansible",
                  key: 2,
                  render: (item) => (
                    <div>
                      <Checkbox
                        checked={item.ansible}
                        onChange={(e) =>
                          changeState(item.id, "ansible", e.target.checked)
                        }
                      />
                    </div>
                  ),
                },
                {
                  title: "Terraform",
                  key: 2,
                  render: (item) => (
                    <div>
                      <Checkbox
                        checked={item.terraform}
                        onChange={(e) =>
                          changeState(item.id, "terraform", e.target.checked)
                        }
                      />
                    </div>
                  ),
                },
                {
                  title: "Git",
                  key: 2,
                  render: (item) => (
                    <div>
                      <Checkbox
                        checked={item.git}
                        onChange={(e) =>
                          changeState(item.id, "git", e.target.checked)
                        }
                      />
                    </div>
                  ),
                },
                {
                  title: "Cloudformation",
                  key: 2,
                  render: (item) => (
                    <div>
                      <Checkbox
                        checked={item.cloudformation}
                        onChange={(e) =>
                          changeState(
                            item.id,
                            "cloudformation",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                  ),
                },
                {
                  title: "Career coaching",
                  key: 2,
                  render: (item) => (
                    <div>
                      <Checkbox
                        checked={item.career_coaching}
                        onChange={(e) =>
                          changeState(
                            item.id,
                            "career_coaching",
                            e.target.checked
                          )
                        }
                      />
                    </div>
                  ),
                },
              ]}
            />
          </Row>
          <Row justify="end">
            <Checkbox
              checked={toDownloadSelected}
              onChange={(e) => setToDownloadSelected(e.target.checked)}
            >
              Download checked members only
            </Checkbox>
            <Button icon={<DownloadOutlined />} onClick={downloadXLSX}>
              Download XLSX
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
