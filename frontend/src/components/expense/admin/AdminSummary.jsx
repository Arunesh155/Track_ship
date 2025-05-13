import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, ArrowDownRight } from "lucide-react"; // using lucide for arrows
import { useNavigate } from "react-router-dom";

const AdminSummary = () => {
  const [summary, setSummary] = useState({});
  const [showProfit, setShowProfit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/view-summary")
      .then(res => setSummary(res.data))
      .catch(err => console.error("Failed to fetch summary"));
  }, []);

  const handleProfitToggle = () => {
    setShowProfit(prev => !prev);
  };

  const profitIsPositive = summary.profit >= 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <div className="p-6 bg-white shadow rounded-lg max-w-md w-full relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
        >
          ←
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Financial Summary</h2>

        <div className="space-y-2 text-lg-center">
          <p><strong>Total Income:</strong> ₹{summary.totalIncome}</p>
          <p><strong>Total Expense:</strong> ₹{summary.totalExpense}</p>
          <p><strong>Total Salary:</strong> ₹{summary.totalSalary}</p>
        </div>

        <button
          onClick={handleProfitToggle}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showProfit ? "Hide Profit" : "View Profit"}
        </button>

        {showProfit && (
          <div className={`mt-4 flex items-center justify-between p-4 rounded-lg border 
          ${profitIsPositive ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"}`}>
            <div className="text-lg font-semibold">
              Profit: ₹{summary.profit}
            </div>
            {profitIsPositive ? (
              <ArrowUpRight className="text-green-600 w-6 h-6" />
            ) : (
              <ArrowDownRight className="text-red-600 w-6 h-6" />
            )}
          </div>
        )}
      </div>
    </div>
  );

};

export default AdminSummary;
