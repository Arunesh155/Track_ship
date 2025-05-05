import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [reason, setReason] = useState({});
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  // Fetch expenses when component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/admin/pending-expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching pending expenses:", err);
      }
    };

    fetchExpenses();
  }, [token]);

  // Handle acceptance of an expense
  const handleAccept = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/approve-expense/${id}`,
        { paymentStatus: "Paid" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Expense approved");
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  // Handle rejection of an expense
  const handleReject = async (id) => {
    if (!reason[id]) {
      alert("Please provide a rejection reason.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/admin/reject-expense/${id}`,
        { reason: reason[id] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Expense rejected");
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Rejection failed:", err);
    }
  };

  return (
    <div className="manage-expenses p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ←
      </button>

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Manage Pending Expenses
      </h2>

      {expenses.length === 0 ? (
        <p className="text-gray-600 text-center">No pending expenses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expenses.map((exp) => (
            <div key={exp._id} className="expense-card bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
              <p className="text-gray-600">Submitted by: {exp.employeeName}</p>
              <p className="text-gray-600">Amount: ₹{exp.amount}</p>
              <p className="text-gray-600">
                Date: {new Date(exp.date).toLocaleDateString("en-IN")}
              </p>
              <p className="text-gray-600">Description: {exp.description}</p>

              {exp.billImage && (
                <img
                  src={`http://localhost:5000/uploads/${exp.billImage}`}
                  alt="Bill"
                  className="w-48 mt-2 rounded-lg border"
                />
              )}

              <p className="mt-2 font-medium text-sm">
                Paid Status:{" "}
                <span
                  className={exp.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}
                >
                  {exp.paymentStatus === "Paid" ? "Paid" : "Unpaid"}
                </span>
              </p>

              <div className="mt-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                <button
                  onClick={() => handleAccept(exp._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <i className="fas fa-check-circle"></i> Accept
                </button>

                <input
                  type="text"
                  placeholder="Rejection Reason"
                  value={reason[exp._id] || ""}
                  onChange={(e) => setReason({ ...reason, [exp._id]: e.target.value })}
                  className="border p-3 rounded-lg w-full md:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />

                <button
                  onClick={() => handleReject(exp._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <i className="fas fa-times-circle"></i> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageExpense;
