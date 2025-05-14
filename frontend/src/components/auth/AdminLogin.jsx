import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import adminLogin from "../../images/adminLogin.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://track-ship-a1n1.onrender.com/api/admin/login", { email, password });
      localStorage.setItem("adminToken", response.data.token);
      alert("Login Successful!");
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  const goToEmployeeLogin = () => {
    navigate("/employee/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
       <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded shadow"
      >
        ← 
      </button>
      <div className="flex w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Image Section */}
        <div className="w-1/2 hidden md:block">
          <img
            src={adminLogin}
            alt="Admin Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Login Form */}
        <div className="w-full md:w-1/2 p-8">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold mb-4">
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Not an admin?{" "}
            <button
              onClick={goToEmployeeLogin}
              className="text-blue-600 hover:underline font-medium"
            >
              Login as Employee
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
