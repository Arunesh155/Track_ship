import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("adminToken");

      try {
        const res = await axios.get("http://localhost:5000/api/admin/expense-charts", {
          headers: { Authorization: token }
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
        const approved = labels.map(label => dataMap[label].approved || 0);
        const rejected = labels.map(label => dataMap[label].rejected || 0);
        const pending = labels.map(label => dataMap[label].pending || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Approved",
              backgroundColor: "#4ade80",
              data: approved
            },
            {
              label: "Rejected",
              backgroundColor: "#f87171",
              data: rejected
            },
            {
              label: "Pending",
              backgroundColor: "#facc15",
              data: pending
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Employee Expense Status (Day-wise)</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Admin Expense Overview" }
          }
        }}
      />
    </div>
  );
};

export default ExpenseChart;
