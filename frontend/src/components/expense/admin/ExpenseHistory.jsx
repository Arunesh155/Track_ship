import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExpenseHistory = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all"); // New state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get("https://track-ship-a1n1.onrender.com/api/admin/expense-history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sortedExpenses = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExpenses(sortedExpenses);
      } catch (error) {
        console.error("Error fetching expense history:", error);
        alert("Failed to fetch expense history.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Filter logic
  const filteredExpenses =
    filterStatus === "all"
      ? expenses
      : expenses.filter((expense) => expense.status === filterStatus);

  return (
    <div className="p-6 relative">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ←
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Expense History</h2>

      {/* Dropdown Filter */}
      <div className="mb-4 text-center">
        <label htmlFor="statusFilter" className="mr-2 font-medium">Filter by Status:</label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {loading ? (
        <p>Loading expenses...</p>
      ) : filteredExpenses.length === 0 ? (
        <p>No expenses found for the selected status.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">Employee</th>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Amount</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Payment</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{expense.employeeName || "N/A"}</td>
                  <td className="px-4 py-2 border-b">{expense.title}</td>
                  <td className="px-4 py-2 border-b">₹{expense.amount}</td>
                  <td className="px-4 py-2 border-b">{expense.date}</td>
                  <td className={`px-4 py-2 border-b ${
                    expense.status === "rejected"
                      ? "text-red-600"
                      : expense.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}>
                    {expense.status}
                  </td>
                  <td className="px-4 py-2 border-b">{expense.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseHistory;
