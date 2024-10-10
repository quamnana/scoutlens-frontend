// src/app/page.js
"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";

const Pages = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardOverview />;
      case "players":
        return <div className="p-4">Players Page (Coming Soon)</div>; // Placeholder
      case "countries":
        return <div className="p-4">Countries Page (Coming Soon)</div>; // Placeholder
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1 bg-gray-100">{renderPage()}</div>
    </div>
  );
};

export default Pages;
