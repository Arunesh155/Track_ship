import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Navbar with Logout Button */}
      <div className="flex justify-between items-center bg-gray-800 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Dashboard Options */}
      <div className="flex justify-center items-center mt-16 space-x-6">
        {/* Add Expense */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg text-lg font-semibold shadow-md"
          onClick={() => navigate("/employee/add-expense")}
        >
          Add Expense
        </button>

        {/* View My Expenses */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg text-lg font-semibold shadow-md"
          onClick={() => navigate("/employee/my-expenses")}
        >
          View My Expenses
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
