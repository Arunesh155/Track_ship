import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaListAlt, FaUserCircle } from "react-icons/fa";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("employeeToken");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/employee/login");
    } else {
      // Decode the token to get the employee name
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setEmployeeName(decodedToken.name); // Assuming 'name' is the field in the token payload
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
        className={`bg-white shadow-md ${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300 ease-in-out h-screen`}
      >
        {/* Hamburger Icon */}
        <button
          className="text-black text-2xl p-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>

        {/* Sidebar Menu - Show only if sidebar is open */}
        {isSidebarOpen && (
          <div className="mt-8 space-y-4">
            {/* Add Expense */}
            <div className="group relative">
              <button
                className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
                onClick={() => navigate("/employee/add-expense")}
              >
                <FaPlusCircle />
                <span className="text-md font-medium">Add Expense</span>
              </button>
            </div>

            {/* My Expenses */}
            <div className="group relative">
              <button
                className="flex items-center gap-4 w-full px-4 py-3 text-black hover:bg-gray-200 rounded-md transition"
                onClick={() => navigate("/employee/my-expenses")}
              >
                <FaListAlt />
                <span className="text-md font-medium">My Expenses</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center text-black py-4 px-6 shadow-md bg-white rounded-md">
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-2xl text-gray-700" />
            <h1 className="text-2xl font-bold">Employee</h1>
          </div>

          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Dashboard Main Content */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Welcome, {employeeName || "Employee"}!
          </h2>
          <p className="text-xl text-gray-700 mb-8 text-center">
            Here, you can manage and track your expenses. Below are the key actions you can perform:
          </p>

          {/* Activities Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <FaPlusCircle className="text-blue-600 text-3xl mb-2" />
              <h4 className="text-lg font-semibold">Add Expense</h4>
              <p className="text-gray-600 mt-1 text-xl font-bold">Submit your new expense entry</p>
              <p className="text-sm text-gray-600 mt-2">Submit details for new business-related expenses.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <FaListAlt className="text-green-600 text-3xl mb-2" />
              <h4 className="text-lg font-semibold">My Expenses</h4>
              <p className="text-gray-600 mt-1 text-xl font-bold">Review all your submitted expenses</p>
              <p className="text-sm text-gray-600 mt-2">Track and manage all your submitted expenses over time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
