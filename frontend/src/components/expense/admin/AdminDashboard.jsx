import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaUsers, FaUserPlus, FaMoneyBillWave, FaReceipt, FaChartPie, FaHistory, FaChartLine, FaClipboardList } from "react-icons/fa";

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
        className={`bg-white shadow-md ${isSidebarOpen ? "w-64" : "w-20"
          } transition-all duration-300 ease-in-out h-screen`}
      >
        {/* Hamburger Icon */}
        <button
          className="text-black text-2xl p-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        {/* Sidebar Menu - Only show when sidebar is open */}
        {isSidebarOpen && (
          <div className="mt-8 space-y-4">
            {/* Register Employee */}
            <div className="group relative">
              <button
                className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
                onClick={() => navigate("/admin/register-employee")}
              >
                <FaUserPlus />
                <span className="text-md font-medium">Register Employee</span>
              </button>
            </div>

            {/* View Employee */}
            <div className="group relative">
              <button
                className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
                onClick={() => navigate("/employee/all")}
              >
                <FaUsers />
                <span className="text-md font-medium">View Employee</span>
              </button>
            </div>

            {/* Manage Expense */}
            <div className="group relative">
              <button
                className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
                onClick={() => navigate("/admin/manage-expense")}
              >
                <FaMoneyBillWave />
                <span className="text-md font-medium">Manage Expense</span>
              </button>
            </div>

            {/* Manage Income */}
            <div className="group relative">
              <button
                className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
                onClick={() => navigate("/admin/manage-income")}
              >
                <FaClipboardList />
                <span className="text-md font-medium">Manage Order</span>
              </button>
            </div>

            {/* Expense History */}
            <div className="group relative">
              <button
                className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
                onClick={() => navigate("/admin/expense-history")}
              >
                <FaHistory />
                <span className="text-md font-medium">Expense History</span>
              </button>
            </div>

            {/* Income History */}
            <div className="group relative">
              <button
                className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
                onClick={() => navigate("/admin/income-history")}
              >
                <FaReceipt />
                <span className="text-md font-medium">Order History</span>
              </button>
            </div>

            {/* Summary */}
            <div className="group relative">
              <button
                className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
                onClick={() => navigate("/admin/summary")}
              >
                <FaChartLine />
                <span className="text-md font-medium">Summary</span>
              </button>
            </div>

            {/* Expense Stats */}
            <div className="group relative">
              <button
                className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
                onClick={() => navigate("/admin/expense-stats")}
              >
                <FaChartPie />
                <span className="text-md font-medium">Expense Stats</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center text-black py-4 px-6 shadow-md bg-white rounded-md">
          {/* Admin Icon and Text */}
          <div className="flex items-center gap-3">
            <FaUserShield className="text-2xl text-blue-600" /> {/* Admin icon */}
            <h1 className="text-2xl font-bold">Admin</h1>
          </div>

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

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Welcome to the Admin Dashboard!
          </h2>
          <p className="text-xl text-gray-700 mb-8 text-center">
            Here, you can manage employees, expenses, income, and track the overall business progress. Below are the key activities you can perform:
          </p>

          {/* Activities Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <FaUsers className="text-blue-600 text-3xl mb-2" />
              <h4 className="text-lg font-semibold">Total Employees</h4>
              <p className="text-gray-600 mt-1 text-xl font-bold">128</p>
              <p className="text-sm text-gray-600 mt-2">Manage and view all employee details.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <FaMoneyBillWave className="text-red-600 text-3xl mb-2" />
              <h4 className="text-lg font-semibold">Total Expenses</h4>
              <p className="text-gray-600 mt-1 text-xl font-bold">₹2,34,000</p>
              <p className="text-sm text-gray-600 mt-2">Track and manage business expenses.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <FaReceipt className="text-green-600 text-3xl mb-2" />
              <h4 className="text-lg font-semibold">Total Orders</h4>
              <p className="text-gray-600 mt-1 text-xl font-bold">450</p>
              <p className="text-sm text-gray-600 mt-2">Monitor orders and customer interactions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <FaChartLine className="text-purple-600 text-3xl mb-2" />
              <h4 className="text-lg font-semibold">Growth</h4>
              <p className="text-gray-600 mt-1 text-xl font-bold">+18%</p>
              <p className="text-sm text-gray-600 mt-2">Track the performance growth.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
