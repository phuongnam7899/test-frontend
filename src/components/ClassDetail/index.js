import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "../../axios";
import { isEmpty } from "lodash";

import { Modal, Button } from "antd";
import EditableInfo from "./EditableInfo";

const ClasssDetail = (props) => {
  const [classInfo, setClassInfo] = useState({});
  useEffect(() => {
    console.log(props.classInfo)
    setClassInfo(props.classInfo);
  },[]);
  useEffect(() => {
    console.log(classInfo)
    updateClass()
  },[classInfo]);

  const success = (message) => {
    Modal.success({
      content: message,
    });
  };
  const sendMail = async (studentEmail) => {
    const response = await axios.post("/api/common/email", {
      email: studentEmail,
    });
    if (response.data.info.accepted.length !== 0) {
      success("Email sent successfully");
    }
  };

  const updateClass = async () => {
    const response = await axios.put("/api/common/class", {
      id : classInfo._id,
      name : classInfo.name,
      code : classInfo.code
    })
    console.log(response)
  }

  return props.visible ? (
    <div className="class-detail">
      <div>
        {/* <EditableInfo label="Name" content={classInfo.name}/> */}
        {/* <EditableInfo label="Code" content={classInfo.code}/> */}
        <div className="class-detail__bar">
          <div>Class Detail</div>
          <i
            className="fas fa-times"
            onClick={() => {
              props.hideDetail();
            }}
          ></i>
        </div>
        <div className="class-detail__main">
          {classInfo.name ? (
            <>
              <EditableInfo
                label="Name"
                content={classInfo.name}
                onUpdate={(newName) => {
                  let classInfoCopy = {...classInfo}
                  // console.log(classInfoCopy.code)
                  classInfoCopy.name = newName
                  console.log(classInfoCopy)
                  setClassInfo(classInfoCopy);
                }}
              />
              <EditableInfo
                label="Code"
                content={classInfo.code}
                onUpdate={(newCode) => {
                  let classInfoCopy = {...classInfo}
                  // console.log(classInfoCopy.code)
                  classInfoCopy.code = newCode
                  console.log(classInfoCopy)
                  setClassInfo(classInfoCopy);
                }}
              />
            </>
          ):null}
          <div className="class-detail__main__students-list">
            {classInfo.students
              ? classInfo.students.map((student, index) => {
                  return (
                    <div className="class-detail__main__students-list__student">
                      <div>#{index + 1}</div>
                      <div>{student.name}</div>
                      <div>
                        {student.email}{" "}
                        <i
                          class="fas fa-envelope"
                          onClick={() => {
                            sendMail(student.email);
                          }}
                        ></i>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        {/* <Button type="primary" size="default">Update</Button> */}
        </div>
      </div>

    </div>
  ) : null;
};

export default ClasssDetail;
