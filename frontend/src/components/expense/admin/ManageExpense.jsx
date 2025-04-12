import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [reason, setReason] = useState({});
  const token = localStorage.getItem("adminToken");

  // This is the useEffect hook where you call fetchExpenses when the component mounts.
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!token) return; // If there's no token, do nothing.

      try {
        // Fetch the pending expenses from the backend.
        const res = await axios.get("http://localhost:5000/api/admin/pending-expenses", {
          headers: { Authorization: `Bearer ${token}` }, // Send the token in the Authorization header.
        });
        console.log(res.data); // Log the response to check its structure.
        setExpenses(res.data); // Update the state with the fetched expenses.
      } catch (err) {
        console.error("Error fetching pending expenses:", err); // Handle any errors during the fetch.
      }
    };

    fetchExpenses(); // Call the fetchExpenses function inside useEffect.

  }, [token]); // The empty dependency array ensures this runs once when the component mounts or token changes.

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
      setExpenses((prev) => prev.filter((e) => e._id !== id)); // Remove the approved expense from the list.
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  const handleReject = async (id) => {
    if (!reason[id]) {
      alert("Please provide a rejection reason.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/admin/reject-expense/${id}`,
        {
          reason: reason[id],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Expense rejected");
      setExpenses((prev) => prev.filter((e) => e._id !== id)); // Remove the rejected expense from the list.
    } catch (err) {
      console.error("Rejection failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Pending Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No pending expenses found.</p>
      ) : (
        expenses.map((exp) => (
          <div key={exp._id} className="bg-white p-4 mb-4 rounded shadow">
            <h3 className="text-xl font-semibold">{exp.title}</h3>
            <p className="text-gray-700">Employee: {exp.employee ? exp.employee.name : "Unknown Employee"}</p>            <p>Amount: ₹{exp.amount}</p>
            <p>Date: {new Date(exp.date).toLocaleDateString("en-IN")}</p>
            <p>Description: {exp.description}</p>

            {exp.billImage && (
              <img
                src={`http://localhost:5000/uploads/${exp.billImage}`}
                alt="Bill"
                className="w-48 mt-2 rounded border"
              />
            )}

            <p className="mt-2 font-medium text-sm">
              Paid Status:{" "}
              <span className={exp.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}>
                {exp.paymentStatus === "Paid" ? "Paid" : "Unpaid"}
              </span>
            </p>

            <div className="mt-4 flex gap-4 items-center">
              <button
                onClick={() => handleAccept(exp._id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Accept
              </button>

              <input
                type="text"
                placeholder="Rejection Reason"
                value={reason[exp._id] || ""}
                onChange={(e) => setReason({ ...reason, [exp._id]: e.target.value })}
                className="border p-2 rounded flex-1"
              />

              <button
                onClick={() => handleReject(exp._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageExpense;
