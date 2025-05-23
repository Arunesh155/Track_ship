import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem("employeeToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!token) return;

      try {
        const res = await axios.get("https://track-ship-a1n1.onrender.com/api/employees/my-expense", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };
    fetchExpenses();
  }, [token]);

  const renderExpenses = (statusLabel) => {
    const filtered = expenses.filter((e) => e.status === statusLabel);

    return filtered.length === 0 ? (
      <p className="text-gray-500 mb-4">No {statusLabel} expenses.</p>
    ) : (
      <div className="flex space-x-4 overflow-x-auto py-2">
        {filtered.map((e) => (
          <div key={e._id} className="min-w-[300px] bg-white p-4 rounded shadow flex-shrink-0">
            <h3 className="text-xl font-semibold">{e.title}</h3>
            <p className="text-gray-700">
              ₹{e.amount} | {new Date(e.date).toLocaleDateString("en-IN")}
            </p>
            <p className="text-gray-600 mb-1">{e.description}</p>

            {e.billImage && (
              <img
                src={`https://track-ship-a1n1.onrender.com/uploads/${e.billImage}`}
                alt="Bill"
                className="w-40 mt-2 rounded border"
              />
            )}

            <p className="mt-3 font-semibold">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  e.status === "approved"
                    ? "bg-green-500"
                    : e.status === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {e.status}
              </span>
            </p>

            {e.status === "rejected" && (
              <p className="mt-1 text-red-600 font-medium">
                Rejection Reason: {e.rejectionReason}
              </p>
            )}

            <p className="mt-2 font-medium text-sm">
              Paid Status:{" "}
              <span className={e.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}>
                {e.paymentStatus === "Paid" ? "Paid" : "Unpaid"}
              </span>
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/employee/dashboard")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ←
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center">My Expenses</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-600 mb-2">✅ Approved Expenses</h3>
        {renderExpenses("approved")}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-yellow-600 mb-2">⏳ Pending Expenses</h3>
        {renderExpenses("pending")}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-red-600 mb-2">❌ Rejected Expenses</h3>
        {renderExpenses("rejected")}
      </div>
    </div>
  );
};

export default ViewExpense;
