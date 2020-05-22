import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./index.css";

const Pagination = (props) => {
  const [perPage, setPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumber = Math.ceil(props.total / perPage);
  console.log(props.total);

  useEffect(() => {
    props.onChangeSetup(perPage, currentPage);
  }, [perPage, currentPage]);

  let arr = [];
  for (let i = 0; i < pageNumber; i++) {
    arr.push(i + 1);
  }

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setPerPage(1);
        }}
      >
        1
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setPerPage(2);
        }}
      >
        2
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setPerPage(3);
        }}
      >
        3
      </Menu.Item>
    </Menu>
  );

  const toPage = (page) => {
    setCurrentPage(page);
    console.log(page);
  };
  const nextPage = () => {
    if (currentPage < pageNumber) setCurrentPage(currentPage + 1);
    console.log(currentPage);
  };
  const previousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    console.log(currentPage);
  };
  return (
    <div className="classes-page__pagination">
      <div>Total: {props.total}</div>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Per page: {perPage} <DownOutlined />
        </a>
      </Dropdown>
      <div className="classes-page__pagination__page-choose">
        <i
          className="classes-page__pagination__page-choose__icon"
          class="fas fa-chevron-circle-left"
          onClick={() => {
            previousPage();
          }}
        ></i>
        {arr.map((element) => {
          return (
            <div
              className={`classes-page__pagination__page-choose__label ${
                element === currentPage
                  ? "classes-page__pagination__page-choose__label--active"
                  : ""
              }`}
              key={element}
              onClick={() => {
                toPage(element);
              }}
            >
              {element}
            </div>
          );
        })}
        <i
          className="classes-page__pagination__page-choose__icon"
          class="fas fa-chevron-circle-right"
          onClick={() => {
            nextPage();
          }}
        ></i>
      </div>
    </div>
  );
};

export default Pagination;
