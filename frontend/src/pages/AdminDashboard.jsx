import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  
  const dashboard = {
    totalEmployees: 0,
    totalProjects: 0,
    totalBudget: 0,
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-blue-500 text-white rounded-lg shadow p-6">
            <h2 className="text-lg">Total Employees</h2>
            <p className="text-4xl font-bold mt-2">
              {dashboard.totalEmployees}
            </p>
          </div>

          <div className="bg-green-500 text-white rounded-lg shadow p-6">
            <h2 className="text-lg">Total Projects</h2>
            <p className="text-4xl font-bold mt-2">
              {dashboard.totalProjects}
            </p>
          </div>

          <div className="bg-orange-500 text-white rounded-lg shadow p-6">
            <h2 className="text-lg">Total Budget</h2>
            <p className="text-4xl font-bold mt-2">
              ₹{dashboard.totalBudget}
            </p>
          </div>

        </div>

        
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex gap-4">

            <Link
              to="/employees"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Manage Employees
            </Link>

            <Link
              to="/projects"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Manage Projects
            </Link>

          </div>
        </div>

        <div className="mt-10 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Activity
          </h2>

          <p className="text-gray-500">
            Dashboard reports and recent updates will appear here.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;