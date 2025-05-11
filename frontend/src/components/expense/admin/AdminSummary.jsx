import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/view-summary")
      .then(res => setSummary(res.data))
      .catch(err => console.error("Failed to fetch summary"));
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Financial Summary</h2>
      <p><strong>Total Income:</strong> ₹{summary.totalIncome}</p>
      <p><strong>Total Expense:</strong> ₹{summary.totalExpense}</p>
      <p><strong>Profit:</strong> ₹{summary.profit}</p>
    </div>
  );
};

export default AdminSummary;
