import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    age: "",
    mobileNo: "",
    proofType: "Aadhar",
    proofFile: null,
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, proofFile: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.proofFile) {
      alert("Please upload a proof document.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("mobileNo", formData.mobileNo);
    formDataToSend.append("proofType", formData.proofType);
    formDataToSend.append("proofFile", formData.proofFile);

    try {
      await axios.post("http://localhost:5000/api/employees/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Employee registered successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error registering employee:", error);
      alert("Failed to register employee.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input type="text" name="mobileNo" placeholder="Mobile Number" value={formData.mobileNo} onChange={handleChange} required className="w-full p-2 border rounded"/>

        {/* Proof Type Selection */}
        <select name="proofType" value={formData.proofType} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Aadhar">Aadhar</option>
          <option value="License">License</option>
        </select>

        {/* File Upload */}
        <input type="file" name="proofFile" onChange={handleFileChange} required className="w-full p-2 border rounded"/>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          Register Employee
        </button>
      </form>
    </div>
  );
};

export default RegisterEmployee;
