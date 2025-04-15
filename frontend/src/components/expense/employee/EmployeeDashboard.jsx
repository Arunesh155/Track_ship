import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaListAlt } from "react-icons/fa";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("employeeToken");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/employee/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("employeeToken");
    navigate("/employee/login");
  };

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
          {/* Add Expense */}
          <div className="group relative">
            <button
              className={`flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition ${
                !isSidebarOpen ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => navigate("/employee/add-expense")}
            >
              <FaPlusCircle />
              {isSidebarOpen && (
                <span className="text-md font-medium">Add Expense</span>
              )}
            </button>
          </div>

          {/* My Expenses */}
          <div className="group relative">
            <button
              className={`flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition ${
                !isSidebarOpen ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => navigate("/employee/my-expenses")}
            >
              <FaListAlt />
              {isSidebarOpen && (
                <span className="text-md font-medium">My Expenses</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center text-black py-4 px-6 shadow-md bg-white rounded-md">
          <h1 className="text-2xl font-bold">Employee Dashboard</h1>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Dashboard Main Content */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-4">
            Welcome to Your Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Add Expense</h3>
              <p className="text-gray-600">Submit your new expense entry.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">My Expenses</h3>
              <p className="text-gray-600">Review all your submitted expenses.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
