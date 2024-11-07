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
  const [pageSize] = useState(15);
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState(null);

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

  // Apply filters to the table data and reset to first page
  const applyFilters = async (_filters) => {
    setFilters(_filters);
    setSortField(_filters.sortField);
    setCurrentPage(1); // Reset to the first page
  };

  // Reset filters and display the original data from the first page
  const resetFilters = () => {
    setFilters({});
    setSortField("age");
    setCurrentPage(1); // Reset to the first page
  };

  // Fetch player stats from API with pagination and filters
  async function fetchPlayersStats() {
    try {
      const params = {
        ...filters,
        page: currentPage - 1,
        size: pageSize,
        sortDir: "desc",
      };
      const data = await getPlayersStats(params);
      setFilteredData(data.players);
      setTotalElements(data.totalItems);
    } catch (error) {
      console.log(error);
    }
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch data when filters or page change
  useEffect(() => {
    fetchPlayersStats();
  }, [filters, currentPage]);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => setFilterDrawerVisible(true)}
          icon={<AlignCenterOutlined />}
        >
          Filter
        </Button>

        <CSVLink data={filteredData} filename="players.csv">
          <Button icon={<CloudDownloadOutlined />}>Export to CSV</Button>
        </CSVLink>
      </Space>

      <PlayerTable
        data={filteredData}
        totalElements={totalElements}
        currentPage={currentPage}
        pageSize={pageSize}
        onRowClick={handleRowClick}
        onPageChange={handlePageChange}
        sortedField={sortField}
      />

      <PlayerDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        player={selectedPlayer}
      />

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
