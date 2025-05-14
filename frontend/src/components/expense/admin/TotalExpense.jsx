import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TotalExpense = () => {
  const [acceptedExpenses, setAcceptedExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedExpenses = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get("https://track-ship-a1n1.onrender.com/api/admin/expense-history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Filter only accepted expenses (robust against case/spacing)
        const filtered = response.data.filter(
          (expense) => expense.status?.toLowerCase().trim() === "accepted"
        );

        setAcceptedExpenses(filtered);
      } catch (error) {
        console.error("Error fetching accepted expenses:", error);
        alert("Failed to fetch accepted expenses.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedExpenses();
  }, []);

  return (
    <div className="p-6 relative">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ←
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Accepted Expense History</h2>

      {loading ? (
        <p>Loading accepted expenses...</p>
      ) : acceptedExpenses.length === 0 ? (
        <p>No accepted expenses found.</p>
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
              {acceptedExpenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{expense.employeeName || "N/A"}</td>
                  <td className="px-4 py-2 border-b">{expense.title}</td>
                  <td className="px-4 py-2 border-b">₹{expense.amount}</td>
                  <td className="px-4 py-2 border-b">{expense.date}</td>
                  <td className="px-4 py-2 border-b text-green-600">{expense.status}</td>
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

export default TotalExpense;
