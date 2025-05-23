import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [billImage, setBillImage] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Not Paid"); // ✅ New field
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("employeeToken");
    const employeeName = localStorage.getItem("employeeName"); // Optional, store at login

    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/employee/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("amount", amount);
      formData.append("date", date);
      formData.append("description", description);
      formData.append("paymentStatus", paymentStatus); // ✅ Added
      formData.append("billImage", billImage);

      if (employeeName) {
        formData.append("employeeName", employeeName); // ✅ Optional
      }

      await axios.post("https://track-ship-a1n1.onrender.com/api/employees/add-expense", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Expense added successfully!");
      navigate("/employee/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={() => navigate("/employee/dashboard")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ← 
      </button>
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Expense</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-2 border rounded mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full p-2 border rounded mb-4"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            className="w-full p-2 border rounded mb-4"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required
          >
            <option value="Not Paid">Not Paid</option>
            <option value="Paid">Paid</option>
          </select>
          <input
            type="file"
            accept="image/*"
            className="w-full mb-4"
            onChange={(e) => setBillImage(e.target.files[0])}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
          >
            Submit Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
