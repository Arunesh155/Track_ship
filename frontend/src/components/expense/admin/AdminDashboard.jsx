import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Navbar with Logout Button */}
      <div className="flex justify-between items-center bg-gray-800 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* Dashboard Options */}
      <div className="flex justify-center items-center mt-16 space-x-6 flex-wrap">
        {/* Register Employee */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg text-lg font-semibold shadow-md"
          onClick={() => navigate("/admin/register-employee")}
        >
          Register Employee
        </button>

        {/* Manage Expense */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg text-lg font-semibold shadow-md"
          onClick={() => navigate("/admin/manage-expense")}
        >
          Manage Expense
        </button>

        {/* View Expense Stats */}
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-lg text-lg font-semibold shadow-md"
          onClick={() => navigate("/admin/expense-stats")}
        >
          View Expense Stats
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
