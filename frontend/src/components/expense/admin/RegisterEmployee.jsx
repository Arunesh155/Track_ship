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
    employeePhoto: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState({
    name: true,
    username: true,
    password: true,
    age: true,
    mobileNo: true,
    proofFile: true,
    employeePhoto: true,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "mobileNo") {
      const mobilePattern = /^[0-9]{10}$/;
      setIsValid({ ...isValid, mobileNo: mobilePattern.test(e.target.value) });
    }

    if (e.target.name === "password") {
      setIsValid({
        ...isValid,
        password: e.target.value.length >= 6,
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.proofFile || !formData.employeePhoto) {
      setMessage("Please upload both proof and employee photo.");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/employees/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Employee registered successfully!");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error registering employee:", error);
      setMessage("Failed to register employee.");
    }
    setIsSubmitting(false);
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
          <label className="block mb-1 font-medium">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
          {!isValid.password && <p className="text-red-500 text-sm">Password should be at least 6 characters.</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mobile Number:</label>
          <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required className="w-full p-2 border rounded" />
          {!isValid.mobileNo && <p className="text-red-500 text-sm">Enter a valid 10-digit mobile number.</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Proof Type:</label>
          <select name="proofType" value={formData.proofType} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Aadhar">Aadhar</option>
            <option value="License">License</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Proof Document:</label>
          <input type="file" name="proofFile" onChange={handleFileChange} required className="w-full p-2 border rounded" />
          {formData.proofFile && <span className="text-sm text-green-600">{formData.proofFile.name}</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Employee Photo:</label>
          <input type="file" name="employeePhoto" accept="image/*" onChange={handleFileChange} required className="w-full p-2 border rounded" />
          {formData.employeePhoto && <span className="text-sm text-green-600">{formData.employeePhoto.name}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded disabled:bg-gray-400">
          {isSubmitting ? "Registering..." : "Register Employee"}
        </button>
      </form>
    </div>
  );
};

export default RegisterEmployee;
