// src/components/IncomeForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageIncome = ({ onIncomeAdded = () => {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    receiverName: "",
    receiverAddress: "",
    receiverPhoneNumber: "",
    courierType: "",
    receivedAmount: "",
    paymentMethod: "",
    notes: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/add-income", formData);
      setMessage("Order recorded successfully!");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
      onIncomeAdded();
      setFormData({
        name: "",
        address: "",
        phoneNumber: "",
        receiverName: "",
        receiverAddress: "",
        receiverPhoneNumber: "",
        courierType: "",
        receivedAmount: "",
        paymentMethod: "",
        notes: ""
      });
    } catch (error) {
      setMessage("Error recording order");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ←
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Add Order</h2>

      {message && (
        <div
          className={`text-center p-2 mb-4 ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Sender Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Sender Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Sender Address:</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Sender Address"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Sender Phone Number:</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Sender Phone Number"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Receiver Name:</label>
          <input
            name="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Receiver Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Receiver Address:</label>
          <input
            name="receiverAddress"
            value={formData.receiverAddress}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Receiver Address"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Receiver Phone Number:</label>
          <input
            name="receiverPhoneNumber"
            value={formData.receiverPhoneNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Receiver Phone Number"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Courier Type:</label>
          <select
            name="courierType"
            value={formData.courierType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Type</option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Amount Received:</label>
          <input
            name="receivedAmount"
            type="number"
            value={formData.receivedAmount}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Amount"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Method</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes (Optional):</label>
          <input
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Notes"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Add Order
        </button>
      </form>
    </div>
  );
};

export default ManageIncome;
