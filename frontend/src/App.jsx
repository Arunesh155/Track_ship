import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import AdminLogin from "./components/auth/AdminLogin";
import AdminDashboard from "./components/expense/admin/AdminDashboard";
import RegisterEmployee from "./components/expense/admin/RegisterEmployee";
import EmployeeLogin from "./components/auth/EmployeeLogin";
import EmployeeDashboard from "./components/expense/employee/EmployeeDashboard";
import AddExpense from "./components/expense/employee/AddExpense";
import ManageExpense from "./components/expense/admin/ManageExpense";
import ViewExpense from "./components/expense/employee/ViewExpense";
import ExpenseChart from "./components/expense/admin/ExpenseChart";
import About from "./components/home/About";
import Contact from "./components/home/Contact";
import Services from "./components/home/Services";
import AllEmployee from "./components/expense/admin/AllEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/register-employee" element={<RegisterEmployee />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/add-expense" element={<AddExpense />} />
        <Route path="/admin/manage-expense" element={<ManageExpense />} />
        <Route path="/employee/my-expenses" element={<ViewExpense />} />
        <Route path="/admin/expense-stats" element={<ExpenseChart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/employee/all" element={<AllEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
