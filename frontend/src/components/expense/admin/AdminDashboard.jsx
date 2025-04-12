import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility

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
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } text-white h-screen transition-all duration-300 ease-in-out`}
      >
        {/* Hamburger Icon */}
        <button
          className="text-black text-3xl p-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        {/* Sidebar Menu */}
        <div className="mt-10">
          <button
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-black px-6 py-4 rounded-lg w-full mb-4 text-lg font-semibold shadow-md transition-colors duration-300`}
            onClick={() => navigate("/admin/register-employee")}
          >
            Register Employee
          </button>

          <button
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-black px-6 py-4 rounded-lg w-full mb-4 text-lg font-semibold shadow-md transition-colors duration-300`}
            onClick={() => navigate("/admin/manage-expense")}
          >
            Manage Expense
          </button>

          <button
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-black px-6 py-4 rounded-lg w-full mb-4 text-lg font-semibold shadow-md transition-colors duration-300`}
            onClick={() => navigate("/admin/expense-stats")}
          >
            View Expense Stats
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center text-black py-4 px-6 shadow-md">
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
          <h2 className="text-3xl font-semibold">Welcome to the Admin Dashboard</h2>
          {/* Other dashboard content can go here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
