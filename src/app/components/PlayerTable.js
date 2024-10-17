import React from "react";
import { Table, Tag } from "antd";
import { getPositionTagColor } from "../utils/app_utils";

const PlayerTable = ({
  data,
  totalElements,
  currentPage,
  pageSize,
  onRowClick,
  onPageChange,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
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
      render: (_, { position }) => {
        const tagInfo = getPositionTagColor(position);
        return (
          <Tag color={tagInfo.color} key={position}>
            {tagInfo._position.toUpperCase()}
          </Tag>
        );
      },
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
        total: totalElements,
        onChange: (page, pageSize) => onPageChange(page, pageSize),
      }}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
};

export default PlayerTable;
