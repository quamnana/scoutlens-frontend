// src/app/components/PlayerTable.js
import React, { useState } from "react";
import { Table } from "antd";

const PlayerTable = ({ data, onRowClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20); // 20 players per page

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
      filters: [
        { text: "Inter Miami", value: "Inter Miami" },
        { text: "Al Nassr", value: "Al Nassr" },
        { text: "Manchester City", value: "Manchester City" },
        { text: "Liverpool", value: "Liverpool" },
      ],
      onFilter: (value, record) => record.team.indexOf(value) === 0,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      filters: [
        { text: "Forward", value: "Forward" },
        { text: "Midfielder", value: "Midfielder" },
        { text: "Defender", value: "Defender" },
      ],
      onFilter: (value, record) => record.position.indexOf(value) === 0,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        onChange: (page) => setCurrentPage(page),
      }}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
};

export default PlayerTable;
