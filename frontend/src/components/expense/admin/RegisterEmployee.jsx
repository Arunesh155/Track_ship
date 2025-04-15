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
  const [isSubmitting, setIsSubmitting] = useState(false);  // For handling submission
  const [message, setMessage] = useState("");  // For showing success or failure messages
  const [isValid, setIsValid] = useState({
    name: true,
    username: true,
    password: true,
    age: true,
    mobileNo: true,
    proofFile: true,
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Real-time Validation
    if (e.target.name === "mobileNo") {
      const mobilePattern = /^[0-9]{10}$/;
      setIsValid({ ...isValid, mobileNo: mobilePattern.test(e.target.value) });
    }

    if (e.target.name === "password") {
      setIsValid({
        ...isValid,
        password: e.target.value.length >= 6,  // Example: minimum 6 chars
      });
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, proofFile: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);  // Set loading state

    if (!formData.proofFile) {
      setMessage("Please upload a proof document.");
      setIsSubmitting(false);
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
      setMessage("Employee registered successfully!");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);  // Delay to let user see the success message
    } catch (error) {
      console.error("Error registering employee:", error);
      setMessage("Failed to register employee.");
    }
    setIsSubmitting(false);  // Set loading state to false after submission
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ← 
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Register Employee</h2>
      
      {/* Real-time Message */}
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
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          {!isValid.password && (
            <p className="text-red-500 text-sm">Password should be at least 6 characters.</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <input
            type="text"
            name="mobileNo"
            placeholder="Mobile Number"
            value={formData.mobileNo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          {!isValid.mobileNo && (
            <p className="text-red-500 text-sm">Please enter a valid 10-digit mobile number.</p>
          )}
        </div>

        {/* Proof Type Selection */}
        <div>
          <select
            name="proofType"
            value={formData.proofType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Aadhar">Aadhar</option>
            <option value="License">License</option>
          </select>
        </div>

        {/* File Upload with Preview */}
        <div className="relative">
          <input
            type="file"
            name="proofFile"
            onChange={handleFileChange}
            required
            className="w-full p-2 border rounded"
          />
          {formData.proofFile && (
            <div className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-green-200 px-2 py-1 text-sm rounded-full">
              {formData.proofFile.name}
            </div>
          )}
        </div>

        {/* Submit Button with Loading */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
          >
            {isSubmitting ? "Registering..." : "Register Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterEmployee;
