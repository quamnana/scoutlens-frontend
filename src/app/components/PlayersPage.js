import React, { useState } from "react";
import PlayerTable from "../components/PlayerTable";
import PlayerDrawer from "../components/PlayerDrawer";
import PlayerFilters from "../components/PlayerFilters";
import { Button, Space } from "antd";
import { CSVLink } from "react-csv";
import { CloudDownloadOutlined, AlignCenterOutlined } from "@ant-design/icons";

const PlayersPage = () => {
  // Sample data for players
  const playersData = [
    {
      key: "1",
      name: "Lionel Messi",
      team: "Inter Miami",
      position: "Forward",
      age: 35,
      goals: 30,
      assists: 10,
      matchesPlayed: 40,
    },
    {
      key: "2",
      name: "Cristiano Ronaldo",
      team: "Al Nassr",
      position: "Forward",
      age: 36,
      goals: 40,
      assists: 15,
      matchesPlayed: 50,
    },
    // Add more player data...
  ];

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [filteredData, setFilteredData] = useState(playersData);

  // Open player detail drawer
  const handleRowClick = (player) => {
    setSelectedPlayer(player);
    setDrawerVisible(true);
  };

  // Close player detail drawer
  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedPlayer(null);
  };

  // Apply filters to the table data
  const applyFilters = (filters) => {
    // Implement your filtering logic here
    console.log("Filters applied", filters);
    // For example: setFilteredData(filteredResults);
  };

  // Reset filters and display the original data
  const resetFilters = () => {
    setFilteredData(playersData);
  };

  return (
    <div>
      {/* Toolbar with Filter, Reset Filters, and Export to CSV Buttons */}
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => setFilterDrawerVisible(true)}
          icon={<AlignCenterOutlined />}
        >
          Filter
        </Button>
        <Button onClick={resetFilters}>Reset Filters</Button>
        <CSVLink data={filteredData} filename="players.csv">
          <Button icon={<CloudDownloadOutlined />}>Export to CSV</Button>
        </CSVLink>
      </Space>

      {/* Player Table */}
      <PlayerTable data={filteredData} onRowClick={handleRowClick} />

      {/* Player Drawer */}
      <PlayerDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        player={selectedPlayer}
      />

      {/* Filter Drawer */}
      <PlayerFilters
        visible={filterDrawerVisible}
        onClose={() => setFilterDrawerVisible(false)}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
    </div>
  );
};

export default PlayersPage;
