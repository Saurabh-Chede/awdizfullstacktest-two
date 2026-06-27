import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "@/config/axiosConfig";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalEmployees: 0,
    totalProjects: 0,
    totalBudget: 0,
    departmentWise: [],
    highestSalaryEmployee: null,
    employeeProjectReport: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard/stats");

      setDashboard(res.data.dashboard);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center text-xl">
          Loading Dashboard...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* Cards */}
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

        {/* Quick Actions */}
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

        {/* Department Wise Employees */}
        <div className="mt-10 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Department Wise Employees
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Employees</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.departmentWise.map((dept) => (
                <tr key={dept.department} className="border-b">
                  <td className="p-2">{dept.department}</td>
                  <td className="p-2">{dept.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Highest Salary Employee */}
        <div className="mt-10 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Highest Salary Employee
          </h2>

          {dashboard.highestSalaryEmployee ? (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong>{" "}
                {dashboard.highestSalaryEmployee.name}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {dashboard.highestSalaryEmployee.department}
              </p>

              <p>
                <strong>Salary:</strong> ₹
                {dashboard.highestSalaryEmployee.salary}
              </p>
            </div>
          ) : (
            <p>No Employee Found</p>
          )}
        </div>

        {/* Employee Project Report */}
        <div className="mt-10 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Employee Project Report
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Employee</th>
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Projects</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.employeeProjectReport.map((emp, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{emp.name}</td>

                  <td className="p-2">{emp.department}</td>

                  <td className="p-2">
                    {emp.projects.length > 0 ? (
                      emp.projects.map((project, i) => (
                        <div key={i}>
                          {project.title} (₹{project.budget}) -{" "}
                          {project.status}
                        </div>
                      ))
                    ) : (
                      "No Projects"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;