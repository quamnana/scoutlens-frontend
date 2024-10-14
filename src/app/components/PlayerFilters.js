import React, { useState } from "react";
import { Select, Slider, Button, Drawer, Space, InputNumber } from "antd";
import { SliderMarks } from "antd/lib/slider";

const { Option } = Select;

const PlayerFilters = ({ visible, onClose, applyFilters, resetFilters }) => {
  const [ageRange, setAgeRange] = useState([18, 40]);
  const [goals, setGoals] = useState(0);
  const [assists, setAssists] = useState(0);
  const [matchesPlayed, setMatchesPlayed] = useState([0, 50]);

  const handleApplyFilters = () => {
    applyFilters({
      ageRange,
      goals,
      assists,
      matchesPlayed,
    });
    onClose();
  };

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
        mode="multiple"
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select positions"
      >
        <Option value="Forward">Forward</Option>
        <Option value="Midfielder">Midfielder</Option>
        <Option value="Defender">Defender</Option>
        <Option value="Goalkeeper">Goalkeeper</Option>
      </Select>

      {/* Filter by Team */}
      <h4>Team</h4>
      <Select
        mode="multiple"
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select teams"
      >
        <Option value="Manchester United">Manchester United</Option>
        <Option value="Barcelona">Barcelona</Option>
        <Option value="Real Madrid">Real Madrid</Option>
        {/* Add more teams */}
      </Select>

      {/* Filter by League */}
      <h4>League</h4>
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        placeholder="Select a league"
      >
        <Option value="Premier League">Premier League</Option>
        <Option value="La Liga">La Liga</Option>
        <Option value="Serie A">Serie A</Option>
        {/* Add more leagues */}
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
