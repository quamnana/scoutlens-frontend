// src/app/components/Sidebar.js
import { Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white">
      <div className="p-4 text-xl font-bold">ScoutLens</div>
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
    </div>
  );
};

export default Sidebar;
