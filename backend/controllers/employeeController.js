const Employee = require("../models/employeeModel");
const PendingExpense = require("../models/PendingExpense");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Employee
exports.registerEmployee = async (req, res) => {
  try {
    const { name, username, password, age, mobileNo, proofType } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Proof file is required." });
    }

    const proofFile = req.file.path;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      username,
      password: hashedPassword,
      age,
      mobileNo,
      proofType,
      proofFile,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error); // 👈 log actual error
    res.status(500).json({ error: "Failed to register employee" });
  }
};

exports.loginEmployee = async (req, res) => {
  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne({ username });

    if (!employee) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: employee._id, username: employee.username },
      "your_secret_key", // change this to an env variable in production
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, employee: { id: employee._id, name: employee.name } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

exports.addExpense = async (req, res) => {
  const { title, amount, date, description, paymentStatus } = req.body;
  const billImage = req.file?.filename;

  try {
    const expense = new PendingExpense({
      employeeId: req.employeeId,
      employeeName: req.employeeName, // Employee's name added from the logged-in user
      title,
      amount,
      date,
      description,
      billImage,
      paymentStatus: paymentStatus || "Not Paid", // Default to "Not Paid" if no status is provided
      status: "pending",
    });

    await expense.save();
    res.json({ message: "Expense submitted for approval" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getMyExpenses = async (req, res) => {
  try {
    const expenses = await PendingExpense.find({ employeeId: req.employeeId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
