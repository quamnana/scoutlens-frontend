// src/app/page.js
"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";
import TopNavigation from "./components/TopNavigation";
import PlayersPage from "./components/PlayersPage";

const Pages = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardOverview />;
      case "players":
        return <PlayersPage />; // Placeholder
      case "countries":
        return <div className="p-4">Countries Page (Coming Soon)</div>; // Placeholder
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col bg-gray-100">
        <TopNavigation />
        <div className="p-4 flex-1 overflow-y-auto">{renderPage()}</div>
      </div>
    </div>
  );
};

export default Pages;
