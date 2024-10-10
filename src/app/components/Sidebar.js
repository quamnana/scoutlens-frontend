// src/app/components/Sidebar.js
"use client";

import { Menu, Layout, Button } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Sider } = Layout;

const Sidebar = ({ setActivePage }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapse}
      className="bg-gray-900"
    >
      <div className="p-4 text-xl font-bold text-white flex items-center justify-between">
        {!collapsed && <span>ScoutLens</span>}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapse}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        className="bg-gray-900"
      >
        <Menu.Item
          key="dashboard"
          icon={<DashboardOutlined />}
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="players"
          icon={<TeamOutlined />}
          onClick={() => setActivePage("players")}
        >
          Players
        </Menu.Item>
        <Menu.Item
          key="countries"
          icon={<GlobalOutlined />}
          onClick={() => setActivePage("countries")}
        >
          Countries
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
