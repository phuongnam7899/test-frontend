import React, { useState, useEffect } from "react";
import ClassesTable from "./ClassesTable";
import Pagination from "./Pagination";
import axios from "../../axios";
import "./index.css"

const ClassesPage = (props) => {
  const [classesData, setClassesData] = useState([]);
  const [total,setTotal] = useState(0)
  // useEffect(() => {
  //   getData(3, 1);
  // }, []);


  
  const getData = async (perPage, currentPage) => {
    setClassesData([])
    //setTimeOut test loader
    setTimeout(async () => {
      const classes = await axios.get(
        `/api/common/class?page=${currentPage}&&perPage=${perPage}`
      );
      // console.log(classes)
      setTotal(classes.data.total)
      let classesInfo = [...classes.data.docs]
      classesInfo.forEach((oneClass) => {
        oneClass.studentCount = oneClass.students.length
      })
      setClassesData(classesInfo);
    },2000)

    // console.log(perPage + " " + currentPage)
  };
  return (
    <div>
      {classesData.length === 0 ? <img className="loader" src = "https://media3.giphy.com/media/LLd6Ma5vQtXyw/giphy.gif?cid=ecf05e470ef39521fac6b49e298a7daaeb2e484749e314f4&rid=giphy.gif"/> : <ClassesTable data={classesData} />}
      <Pagination total={total} onChangeSetup={getData} />
    </div>
  );
};

export default ClassesPage;
