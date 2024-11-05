import React, { useEffect, useState } from "react";
import PlayerTable from "../components/PlayerTable";
import PlayerDrawer from "../components/PlayerDrawer";
import PlayerFilters from "../components/PlayerFilters";
import { Button, Space } from "antd";
import { CSVLink } from "react-csv";
import { CloudDownloadOutlined, AlignCenterOutlined } from "@ant-design/icons";
import { getPlayersStats } from "../api/playersEndpoints";

const PlayersPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15); // Define the number of players per page

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
    fetchPlayersStats(1); // Reset to the first page and re-fetch all data
    setCurrentPage(0);
  };

  // Fetch player stats from API, including pagination
  async function fetchPlayersStats(page = 1) {
    try {
      const params = { page: page - 1, size: pageSize };
      const data = await getPlayersStats(params); // Pass the current page and pageSize to the API
      setFilteredData(data.content); // Assuming API returns player data in `content`
      setTotalElements(data.totalElements); // Assuming API returns total player count in `totalElements`
    } catch (error) {
      console.log(error);
    }
  }

  // Handle page change and fetch the new page data
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPlayersStats(page);
  };

  useEffect(() => {
    fetchPlayersStats(currentPage); // Fetch data for the initial page load
  }, [currentPage]);

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

      {/* Player Table with pagination */}
      <PlayerTable
        data={filteredData}
        totalElements={totalElements}
        currentPage={currentPage}
        pageSize={pageSize}
        onRowClick={handleRowClick}
        onPageChange={handlePageChange} // Handle pagination changes
      />

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
