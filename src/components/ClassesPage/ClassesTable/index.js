import React, { useState, useEffect } from "react";
import { Table } from "antd";
import ClassDetail from "../../ClassDetail";
import "antd/dist/antd.css";
import { isEmpty } from "lodash";

const ClassesTable = (props) => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentClass, setCurrentClass] = useState({});

  const turnOnDetail = (id) => {
    setDetailVisible(true);
    const foundData = props.data.filter((element) => {
      return element._id === id;
    });
    setCurrentClass(foundData[0]);
  };
  const turnOffDetail = () => {
    setDetailVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Student Count",
      dataIndex: "studentCount",
      key: "studentCount",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (text, record) => {
        return (
          <i
            onClick={() => {
              turnOnDetail(record._id);
            }}
            class="fas fa-pencil-alt"
          ></i>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        dataSource={props.data}
        columns={columns}
        bordered
        pagination={false}
      />
      {isEmpty(currentClass) ? null : (
        <ClassDetail
          visible={detailVisible}
          classInfo={currentClass}
          hideDetail={turnOffDetail}
        />
      )}
    </div>
  );
};

export default ClassesTable;
