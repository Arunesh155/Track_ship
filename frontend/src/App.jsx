import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import AdminLogin from "./components/auth/AdminLogin";
import AdminDashboard from "./components/expense/admin/AdminDashboard";
import RegisterEmployee from "./components/expense/admin/RegisterEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/register-employee" element={<RegisterEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
