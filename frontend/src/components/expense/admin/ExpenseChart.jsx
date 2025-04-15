import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Added this line
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartType, setChartType] = useState("bar");
  const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [] });
  const navigate = useNavigate(); // ✅ Added this line

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Admin Expense Overview" },
    },
  };

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("adminToken");

      try {
        const res = await axios.get("http://localhost:5000/api/admin/expense-charts", {
          headers: { Authorization: token },
        });

        const raw = res.data;
        const dataMap = {};

        raw.forEach(({ _id, totalAmount }) => {
          const dateKey = `${_id.day}/${_id.month}/${_id.year}`;
          if (!dataMap[dateKey]) {
            dataMap[dateKey] = { approved: 0, rejected: 0, pending: 0 };
          }
          dataMap[dateKey][_id.status] = totalAmount;
        });

        const labels = Object.keys(dataMap);
        const approved = labels.map((label) => dataMap[label].approved || 0);
        const rejected = labels.map((label) => dataMap[label].rejected || 0);
        const pending = labels.map((label) => dataMap[label].pending || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Approved",
              backgroundColor: "#4ade80",
              data: approved,
            },
            {
              label: "Rejected",
              backgroundColor: "#f87171",
              data: rejected,
            },
            {
              label: "Pending",
              backgroundColor: "#facc15",
              data: pending,
            },
          ],
        });

        const totalApproved = approved.reduce((a, b) => a + b, 0);
        const totalRejected = rejected.reduce((a, b) => a + b, 0);
        const totalPending = pending.reduce((a, b) => a + b, 0);

        setPieChartData({
          labels: ["Approved", "Rejected", "Pending"],
          datasets: [
            {
              label: "Total",
              data: [totalApproved, totalRejected, totalPending],
              backgroundColor: ["#4ade80", "#f87171", "#facc15"],
              borderColor: "#fff",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 relative">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ← 
      </button>
      <h2 className="text-2xl font-semibold mb-6 text-center">All Employee Expense Status</h2>

      {/* Chart Type Buttons */}
      <div className="flex gap-4 justify-center mb-6 flex-wrap">
        <button
          onClick={() => setChartType("bar")}
          className={`px-4 py-2 rounded bg-blue-600 text-white ${
            chartType === "bar" ? "ring-2 ring-blue-400" : ""
          }`}
        >
          Bar
        </button>
        <button
          onClick={() => setChartType("line")}
          className={`px-4 py-2 rounded bg-green-600 text-white ${
            chartType === "line" ? "ring-2 ring-green-400" : ""
          }`}
        >
          Line
        </button>
        <button
          onClick={() => setChartType("pie")}
          className={`px-4 py-2 rounded bg-pink-600 text-white ${
            chartType === "pie" ? "ring-2 ring-pink-400" : ""
          }`}
        >
          Pie
        </button>
        <button
          onClick={() => setChartType("doughnut")}
          className={`px-4 py-2 rounded bg-purple-600 text-white ${
            chartType === "doughnut" ? "ring-2 ring-purple-400" : ""
          }`}
        >
          Doughnut
        </button>
      </div>

      {/* Chart Display */}
      <div className="w-full md:w-[700px] h-[400px] mx-auto bg-white p-4 rounded shadow flex items-center justify-center">
        {chartType === "bar" && <Bar data={chartData} options={options} />}
        {chartType === "line" && <Line data={chartData} options={options} />}
        {(chartType === "pie" || chartType === "doughnut") && (
          <div className="flex items-center justify-center w-full h-full">
            {chartType === "pie" ? (
              <Pie data={pieChartData} options={options} />
            ) : (
              <Doughnut data={pieChartData} options={options} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
