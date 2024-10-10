// pages/index.js
import Sidebar from "../components/Sidebar";
import DashboardOverview from "../components/DashboardOverview";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <DashboardOverview />
      </div>
    </div>
  );
};

export default Dashboard;
