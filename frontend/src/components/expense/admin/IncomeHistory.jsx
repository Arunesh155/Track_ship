// src/components/IncomeList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IncomeHistory = () => {
  const [incomes, setIncomes] = useState([]);
  const navigate = useNavigate();

  const fetchIncomes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/income-history");
      setIncomes(res.data);
    } catch (error) {
      alert("Failed to fetch income data");
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div className="relative min-h-screen p-6 bg-gray-50">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Income History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow bg-white rounded-lg">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Courier ID</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Method</th>
              <th className="px-4 py-2 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{new Date(income.date).toLocaleString()}</td>
                <td className="px-4 py-2 border">{income.name}</td>
                <td className="px-4 py-2 border">{income.courierId}</td>
                <td className="px-4 py-2 border">{income.courierType}</td>
                <td className="px-4 py-2 border">₹{income.receivedAmount}</td>
                <td className="px-4 py-2 border">{income.paymentMethod}</td>
                <td className="px-4 py-2 border">{income.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeHistory;
