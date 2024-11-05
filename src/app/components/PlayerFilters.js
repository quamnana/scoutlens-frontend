import React, { useEffect, useState } from "react";
import { Select, Slider, Button, Drawer, Space, InputNumber } from "antd";
import { SliderMarks } from "antd/lib/slider";
import { getPlayersStatsFilterParams } from "../api/playersEndpoints";
import { convertCountryName, playerPositions } from "../utils/app_utils";

const { Option } = Select;

const PlayerFilters = ({ visible, onClose, applyFilters, resetFilters }) => {
  const [ageRange, setAgeRange] = useState(null);
  const [goals, setGoals] = useState(null);
  const [assists, setAssists] = useState(null);
  const [matchesPlayed, setMatchesPlayed] = useState(null);
  const [position, setPosition] = useState(null);
  const [team, setTeam] = useState(null);
  const [league, setLeague] = useState("Premier League");
  const [nation, setNation] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [nations, setNations] = useState([]);

  const handleApplyFilters = () => {
    applyFilters({
      ageRange,
      goals,
      assists,
      matchesPlayed,
      position,
      team,
      league,
      nation,
    });
    onClose();
  };

  async function fetchLeagues(league = "distinct") {
    try {
      const params = { league };
      const data = await getPlayersStatsFilterParams(params);
      setLeagues(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchNations(nation = "distinct") {
    try {
      const params = { nation };
      const data = await getPlayersStatsFilterParams(params);
      setNations(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTeams(league) {
    try {
      const params = { league };
      const data = await getPlayersStatsFilterParams(params);
      setTeams(data);
      setLeague(league);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLeagues();
    fetchNations();
    fetchTeams(league); // Fetch teams for the first league by default
  }, []);

  return (
    <Drawer
      title="Filter Players"
      visible={visible}
      onClose={onClose}
      width={400}
      footer={
        <Space>
          <Button onClick={resetFilters}>Reset</Button>
          <Button type="primary" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Space>
      }
    >
      {/* Filter by Position */}
      <h4>Position</h4>
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select positions"
        onChange={(value) => setPosition(playerPositions[value][0])}
      >
        <Option value="Forward">Forward</Option>
        <Option value="Midfielder">Midfielder</Option>
        <Option value="Defender">Defender</Option>
        <Option value="Goalkeeper">Goalkeeper</Option>
      </Select>

      {/* Filter by League */}
      <h4>League</h4>
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select a league"
        onChange={async (value) => await fetchTeams(value)}
        defaultValue="Premier League"
      >
        {leagues?.map((_league) => (
          <Option key={_league} value={_league}>
            {_league}
          </Option>
        ))}
      </Select>

      {/* Filter by Team */}
      <h4>Team</h4>
      <Select
        // mode="multiple"
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select teams"
        onChange={(value) => setTeam(value)}
      >
        {teams?.map((_team) => (
          <Option key={_team} value={_team}>
            {_team}
          </Option>
        ))}
      </Select>

      {/* Filter by Nation */}
      <h4>Nation</h4>
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select a nation"
        onChange={(value) => setNation(value)}
      >
        {nations?.map((_nation) => (
          <Option key={_nation} value={_nation}>
            {convertCountryName(_nation)}
          </Option>
        ))}
      </Select>

      {/* Filter by Age */}
      <h4>Age Range</h4>
      <Slider
        range
        min={18}
        max={40}
        value={ageRange}
        onChange={(value) => setAgeRange(value)}
        marks={{ 18: "18", 40: "40" }}
        style={{ marginBottom: 16 }}
      />

      {/* Filter by Goals Scored */}
      <h4>Goals Scored</h4>
      <Slider
        min={0}
        max={50}
        value={goals}
        onChange={(value) => setGoals(value)}
        marks={{ 0: "0", 50: "50" }}
        style={{ marginBottom: 16 }}
      />

      {/* Filter by Assists */}
      <h4>Assists</h4>
      <Slider
        min={0}
        max={50}
        value={assists}
        onChange={(value) => setAssists(value)}
        marks={{ 0: "0", 50: "50" }}
        style={{ marginBottom: 16 }}
      />

      {/* Filter by Matches Played */}
      <h4>Matches Played</h4>
      <Slider
        range
        min={0}
        max={50}
        value={matchesPlayed}
        onChange={(value) => setMatchesPlayed(value)}
        marks={{ 0: "0", 50: "50" }}
        style={{ marginBottom: 16 }}
      />
    </Drawer>
  );
};

export default PlayerFilters;
