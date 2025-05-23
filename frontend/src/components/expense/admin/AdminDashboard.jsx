import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaUsers,
  FaUserPlus,
  FaMoneyBillWave,
  FaReceipt,
  FaChartPie,
  FaHistory,
  FaChartLine,
  FaClipboardList,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    const fetchSummaryData = async () => {
      try {
        const response = await fetch("https://track-ship-a1n1.onrender.com/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setTotalEmployees(data.totalEmployees);
        setTotalExpenses(data.totalExpenses);
        setTotalOrders(data.totalOrders);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummaryData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md ${isSidebarOpen ? "w-64" : "w-20"
          } transition-all duration-300 ease-in-out h-screen`}
      >
        <button
          className="text-black text-2xl p-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        {isSidebarOpen && (
          <div className="mt-8 space-y-4">
            <button className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
              onClick={() => navigate("/admin/register-employee")}>
              <FaUserPlus />
              <span className="text-md font-medium">Register Employee</span>
            </button>

            <button className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
              onClick={() => navigate("/admin/manage-expense")}>
              <FaMoneyBillWave />
              <span className="text-md font-medium">Manage Expense</span>
            </button>

            <button className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
              onClick={() => navigate("/admin/manage-income")}>
              <FaClipboardList />
              <span className="text-md font-medium">Manage Order</span>
            </button>

            <button className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
              onClick={() => navigate("/admin/expense-history")}>
              <FaHistory />
              <span className="text-md font-medium">Expense History</span>
            </button>

            <button className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
              onClick={() => navigate("/admin/summary")}>
              <FaChartLine />
              <span className="text-md font-medium">Summary</span>
            </button>

            <button className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
              onClick={() => navigate("/admin/expense-stats")}>
              <FaChartPie />
              <span className="text-md font-medium">Expense Stats</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center text-black py-4 px-6 shadow-md bg-white rounded-md">
          <div className="flex items-center gap-3">
            <FaUserShield className="text-2xl text-blue-600" />
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
            Here, you can manage employees, expenses, income, and track the overall business progress.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto ">
            {/* Total Employees */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/employee/all")}>
              <FaUsers className="text-blue-600 text-3xl mb-2" />
              <h4 className="text-lg font-semibold">Total Employees</h4>
              <p className="text-gray-600 mt-1 text-xl font-bold">{totalEmployees}</p>
              <p className="text-sm text-gray-600 mt-2">Manage and view all employee details.</p>
            </div>

            {/* Total Orders */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/admin/income-history")}>
              <FaReceipt className="text-green-600 text-3xl mb-2" />
              <h4 className="text-lg font-semibold">Total Orders</h4>
              <p className="text-gray-600 mt-1 text-xl font-bold">{totalOrders}</p>
              <p className="text-sm text-gray-600 mt-2">Monitor orders and customer interactions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
