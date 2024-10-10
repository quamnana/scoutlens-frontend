// src/app/components/TopNavigation.js
"use client";

import { Input, Avatar, Button, Typography } from "antd";
import { UserOutlined, BellOutlined, SettingOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Title } = Typography;

const TopNavigation = () => {
  const onSearch = (value) => {
    console.log("Search:", value);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <Title style={{ fontWeight: "bolder" }}>Dashboard</Title>

      <div className="flex items-center space-x-2">
        <Search
          placeholder="Search players by teams or leagues"
          size="large"
          onSearch={onSearch}
          style={{ width: 600 }}
        />
        <Button icon={<BellOutlined />} type="text" />
        <Button icon={<SettingOutlined />} type="text" />
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </div>
  );
};

export default TopNavigation;
