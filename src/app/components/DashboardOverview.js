// components/DashboardOverview.js
import { Card, Statistic, Table, Tag } from "antd";
import {
  TeamOutlined,
  TrophyOutlined,
  GlobalOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useEffect, useState } from "react";
import BarGraph from "./BarGraph";
import PlayerMap from "./PlayerMap";
import TopStats from "./TopStats";
import PlayersPreviewTable from "./PlayersPreviewTable";
import { getPlayersOverview, getPlayersStats } from "../api/playersEndpoints";
import {
  getTeamAndPlayersTotals,
  convertCountryNames,
} from "../utils/app_utils";

const statisticStyles = {
  //   color: "#3f8600",
  fontWeight: "700",
  fontSize: 50,
};

const DashboardOverview = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [playersStatsPreview, setPlayersStatsPreview] = useState(null);

  async function fetchPlayersStatsPreview() {
    try {
      const data = await getPlayersStats();
      setPlayersStatsPreview(data.content);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPlayersStatsOverview() {
    try {
      const data = await getPlayersOverview();
      console.log(data);
      const totals = await getTeamAndPlayersTotals(data?.leaguesData);
      data["totalPlayers"] = totals?.totalPlayers;
      data["totalTeams"] = totals?.totalTeams;

      // const convertedCountriesData = await convertCountryNames(
      //   data?.countriesData
      // );
      // data["countriesData"] = convertedCountriesData;
      console.log(data);

      // console.log(data);
      setOverviewData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPlayersStatsOverview();
    fetchPlayersStatsPreview();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Statistic
            title="Players"
            value={overviewData?.totalPlayers}
            prefix={<UserOutlined />}
            valueStyle={statisticStyles}
          />
        </Card>
        <Card>
          <Statistic
            title="Leagues"
            value={overviewData?.leaguesData?.length}
            prefix={<TrophyOutlined />}
            valueStyle={statisticStyles}
          />
        </Card>
        <Card>
          <Statistic
            title="Countries"
            value={overviewData?.countriesData?.length}
            prefix={<GlobalOutlined />}
            valueStyle={statisticStyles}
          />
        </Card>
        <Card>
          <Statistic
            title="Teams"
            value={overviewData?.totalTeams}
            prefix={<TeamOutlined />}
            valueStyle={statisticStyles}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <BarGraph
          title="Number of Players and Teams in Each League"
          data={overviewData?.leaguesData}
          xAxisKey="league"
          dataKeys={["players", "teams"]}
          colors={["#030852", "#597ef7"]}
        />
        <Card title="Number of Players in Each Country" className="mt-4">
          {overviewData?.countriesData && (
            <PlayerMap data={overviewData?.countriesData} />
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TopStats
            title="Top Goalscorers"
            data={overviewData?.topGoalScorers}
          />
          <TopStats title="Assists Leaders" data={overviewData?.topAssists} />
          <TopStats title="Top Passers" data={overviewData?.topPassers} />
          <TopStats title="Top Tacklers" data={overviewData?.topTacklers} />
        </div>
        <PlayersPreviewTable data={playersStatsPreview} />
      </div>
    </div>
  );
};

export default DashboardOverview;
