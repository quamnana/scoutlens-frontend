// components/DashboardOverview.js
import { Card, Statistic, Table, Tag } from "antd";
import {
  TeamOutlined,
  TrophyOutlined,
  GlobalOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dummyData = {
  totalPlayers: 500,
  totalLeagues: 20,
  totalCountries: 15,
  players: Array.from({ length: 20 }, (_, i) => ({
    key: i,
    name: `Player ${i + 1}`,
    nation: "England",
    position: "Midfielder",
    team: `Team ${i + 1}`,
    league: "Premier League",
    age: 20 + i,
  })),
  countriesData: [
    { name: "Spain", players: 100 },
    { name: "Germany", players: 75 },
    { name: "England", players: 80 },
    { name: "France", players: 60 },
  ],
};

const statisticStyles = {
  //   color: "#3f8600",
  fontWeight: "700",
  fontSize: 50,
};

const DashboardOverview = () => {
  const [data] = useState(dummyData);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nation",
      dataIndex: "nation",
      key: "nation",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (_, { position }) => {
        let color;
        if (position === "Goalkepper") {
          color = "orange";
        } else if (position === "Defender") {
          color = "lime";
        } else if (position === "Midfielder") {
          color = "gold";
        } else {
          color = "volcano";
        }
        return (
          <Tag color={color} key={position}>
            {position.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "League",
      dataIndex: "league",
      key: "league",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Statistic
            title="Players"
            value={data.totalPlayers}
            prefix={<UserOutlined />}
            valueStyle={statisticStyles}
          />
        </Card>
        <Card>
          <Statistic
            title="Leagues"
            value={data.totalLeagues}
            prefix={<TrophyOutlined />}
            valueStyle={statisticStyles}
          />
        </Card>
        <Card>
          <Statistic
            title="Countries"
            value={data.totalCountries}
            prefix={<GlobalOutlined />}
            valueStyle={statisticStyles}
          />
        </Card>
        <Card>
          <Statistic
            title="Teams"
            value={data.totalCountries}
            prefix={<TeamOutlined />}
            valueStyle={statisticStyles}
          />
        </Card>
      </div>

      <Card title="Players" className="mt-4">
        <Table
          columns={columns}
          dataSource={data.players}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Card title="Player Distribution by Country" className="mt-4">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data.countriesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="players"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default DashboardOverview;
