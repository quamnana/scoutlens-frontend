import React, { useEffect, useState } from "react";
import { Select, Slider, Button, Drawer, Space, InputNumber } from "antd";
import { SliderMarks } from "antd/lib/slider";
import { getPlayersStatsFilterParams } from "../api/playersEndpoints";
import {
  convertCountryName,
  playerPositions,
  prependElement,
} from "../utils/app_utils";
import { getCategories } from "../api/categoryEndpoints";
import { DATA_FIELDS } from "../utils/data_fields";

const { Option } = Select;

const PlayerFilters = ({ visible, onClose, applyFilters, resetFilters }) => {
  const [ageRange, setAgeRange] = useState(null);
  const [goals, setGoals] = useState(null);
  const [assists, setAssists] = useState(null);
  const [matchesPlayed, setMatchesPlayed] = useState(null);
  const [position, setPosition] = useState("Any Position");
  const [team, setTeam] = useState("Any Team");
  const [league, setLeague] = useState("Any League");
  const [nation, setNation] = useState("Any Nationality");
  const [field, setField] = useState("age");
  const [positions, setPositions] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [nations, setNations] = useState([]);

  const handleApplyFilters = () => {
    applyFilters({
      // ageRange,
      position: position === "Any Position" ? null : position,
      team: team === "Any Team" ? null : team,
      league: league === "Any League" ? null : league,
      nation: nation === "Any Nationality" ? null : nation,
      sortField: field,
    });

    onClose();
  };

  const handleResetFilters = () => {
    setPosition("Any Position");
    setTeam("Any Team");
    setLeague("Any League");
    setNation("Any Nationality");
    setField("age");
    resetFilters();

    // onClose();
  };

  async function fetchPositions() {
    try {
      let data = await getCategories("position");
      data = prependElement(data, "Any Position");
      setPositions(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLeagues() {
    try {
      let data = await getCategories("league");
      data = prependElement(data, "Any League");
      setLeagues(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchNations() {
    try {
      let data = await getCategories("nation");
      data = prependElement(data, "Any Nationality");
      setNations(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTeams(league) {
    try {
      const params = { league };
      let data = await await getCategories("teams", params);
      data = prependElement(data, "Any Team");
      setTeams(data);
      setLeague(league);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPositions();
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
          <Button onClick={handleResetFilters}>Reset</Button>
          <Button type="primary" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Space>
      }
    >
      <h4>Position</h4>
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select positions"
        value={position}
        onChange={(value) => setPosition(value)}
      >
        {positions?.map((_position) => (
          <Option key={_position} value={_position}>
            {_position}
          </Option>
        ))}
      </Select>

      <h4>League</h4>
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select a league"
        value={league}
        onChange={async (value) => await fetchTeams(value)}
      >
        {leagues?.map((_league) => (
          <Option key={_league} value={_league}>
            {_league}
          </Option>
        ))}
      </Select>

      <h4>Team</h4>
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select teams"
        value={team}
        onChange={(value) => setTeam(value)}
      >
        {teams?.map((_team) => (
          <Option key={_team} value={_team}>
            {_team}
          </Option>
        ))}
      </Select>

      <h4>Nation</h4>
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select a nationality"
        value={nation}
        onChange={(value) => setNation(value)}
      >
        {nations?.map((_nation) => (
          <Option key={_nation} value={_nation}>
            {convertCountryName(_nation)}
          </Option>
        ))}
      </Select>

      <h4>Sort By</h4>
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select a stat"
        value={field}
        onChange={(value) => setField(value)}
      >
        {DATA_FIELDS?.map((field) => (
          <Option key={field} value={field}>
            {field}
          </Option>
        ))}
      </Select>
    </Drawer>
  );
};

export default PlayerFilters;
