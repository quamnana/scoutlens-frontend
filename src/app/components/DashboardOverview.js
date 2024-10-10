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
import BarGraph from "./BarGraph";
import PlayerMap from "./PlayerMap";
import TopStats from "./TopStats";

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
    { name: "Italy", players: 50 },
    { name: "Brazil", players: 90 },
    { name: "Argentina", players: 70 },
  ],
  leaguesData: [
    { league: "La Liga", players: 150, teams: 20 },
    { league: "Bundesliga", players: 120, teams: 18 },
    { league: "Premier League", players: 180, teams: 20 },
    { league: "Serie A", players: 130, teams: 20 },
    { league: "Ligue 1", players: 100, teams: 18 },
  ],
  topGoalscorers: [
    { name: "Lionel Messi", team: "Inter Miami", stats: 40 },
    { name: "Cristiano Ronaldo", team: "Al Nassr", stats: 35 },
    { name: "Erling Haaland", team: "Manchester City", stats: 33 },
  ],
  defensiveMonsters: [
    { name: "Virgil van Dijk", team: "Liverpool", stats: 100 },
    { name: "Ruben Dias", team: "Manchester City", stats: 95 },
    { name: "Kalidou Koulibaly", team: "Al Hilal", stats: 93 },
  ],
  assistLeaders: [
    { name: "Kevin De Bruyne", team: "Manchester City", stats: 20 },
    { name: "Bruno Fernandes", team: "Manchester United", stats: 18 },
    { name: "Lionel Messi", team: "Inter Miami", stats: 17 },
  ],
  saveMonsters: [
    { name: "Thibaut Courtois", team: "Real Madrid", stats: 90 },
    { name: "Alisson Becker", team: "Liverpool", stats: 88 },
    { name: "Ederson Moraes", team: "Manchester City", stats: 85 },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <BarGraph
          title="Number of Players and Teams in Each League"
          data={data.leaguesData}
          xAxisKey="league"
          dataKeys={["players", "teams"]}
          colors={["#8884d8", "#82ca9d"]}
        />
        <Card title="Number of Players in Each Country" className="mt-4">
          <PlayerMap data={data.countriesData} />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TopStats title="Top Goalscorers" data={data.topGoalscorers} />
          <TopStats title="Defensive Monsters" data={data.defensiveMonsters} />
          <TopStats title="Assist Leaders" data={data.assistLeaders} />
          <TopStats title="Save Monsters" data={data.saveMonsters} />
        </div>
        <Card title="Players" className="mt-4 md:mt-0">
          <Table
            columns={columns}
            dataSource={data.players}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
