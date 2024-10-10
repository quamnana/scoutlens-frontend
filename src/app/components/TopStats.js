// src/app/components/TopStats.js
"use client";

import { Card, Table } from "antd";

const TopStats = ({ title, data }) => {
  const columns = [
    {
      title: "Player",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Stats",
      dataIndex: "stats",
      key: "stats",
    },
  ];

  return (
    <Card title={title} className="mt-4">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.name}
      />
    </Card>
  );
};

export default TopStats;
