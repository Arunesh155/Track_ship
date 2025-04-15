import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaMoneyBillWave, FaChartPie } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 ease-in-out h-screen`}
      >
        {/* Hamburger Icon */}
        <button
          className="text-black text-2xl p-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        {/* Sidebar Menu */}
        <div className="mt-8 space-y-4">
          {/* Register Employee */}
          <div className="group relative">
            <button
              className={`flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition ${
                !isSidebarOpen ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => navigate("/admin/register-employee")}
            >
              <FaUserPlus />
              {isSidebarOpen && (
                <span className="text-md font-medium">Register Employee</span>
              )}
            </button>
            {!isSidebarOpen && (
              <span className="absolute left-full ml-2 top-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Register
              </span>
            )}
          </div>

          {/* Manage Expense */}
          <div className="group relative">
            <button
              className={`flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition ${
                !isSidebarOpen ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => navigate("/admin/manage-expense")}
            >
              <FaMoneyBillWave />
              {isSidebarOpen && (
                <span className="text-md font-medium">Manage Expense</span>
              )}
            </button>
            {!isSidebarOpen && (
              <span className="absolute left-full ml-2 top-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Manage
              </span>
            )}
          </div>

          {/* Expense Stats */}
          <div className="group relative">
            <button
              className={`flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition ${
                !isSidebarOpen ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => navigate("/admin/expense-stats")}
            >
              <FaChartPie />
              {isSidebarOpen && (
                <span className="text-md font-medium">Expense Stats</span>
              )}
            </button>
            {!isSidebarOpen && (
              <span className="absolute left-full ml-2 top-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Stats
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center text-black py-4 px-6 shadow-md bg-white rounded-md">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300"
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

        {/* Dashboard Main Content */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-4">
            Welcome to the Admin Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Employees</h3>
              <p className="text-gray-600">
                Register and manage employee accounts.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Expenses</h3>
              <p className="text-gray-600">
                Track and manage all expense records.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Reports</h3>
              <p className="text-gray-600">
                View detailed analytics and statistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
