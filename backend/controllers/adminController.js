const Admin = require("../models/adminModel");
const PendingExpense = require("../models/PendingExpense");
const ApprovedExpense = require("../models/ApprovedExpense");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Admin
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new admin
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// Admin Dashboard (Protected Route)
exports.adminDashboard = async (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
};

exports.getPendingExpenses = async (req, res) => {
  try {
    const expenses = await PendingExpense.find({ status: "pending" });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveExpense = async (req, res) => {
  try {
    // Update the expense
    const expense = await PendingExpense.findByIdAndUpdate(
      req.params.id,
      { 
        status: "approved", 
        paymentStatus: "Paid", // Ensure paymentStatus is updated
        rejectionReason: "" 
      },
      { new: true } // Return the updated document
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    console.log("Updated expense:", expense); // Log to check if the update happened

    res.json({ message: "Expense approved", expense });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Reject Expense
exports.rejectExpense = async (req, res) => {
  const { reason } = req.body;
  try {
    const expense = await PendingExpense.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", rejectionReason: reason },
      { new: true }
    );
    res.json({ message: "Expense rejected", expense });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllExpenseStats = async (req, res) => {
  try {
    const stats = await PendingExpense.aggregate([
      {
        $group: {
          _id: {
            year: { $year: { $toDate: "$date" } },
            month: { $month: { $toDate: "$date" } },
            day: { $dayOfMonth: { $toDate: "$date" } },
            status: "$status"
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);

    res.json(stats);
  } catch (error) {
    console.error("Admin expense stats error:", error);
    res.status(500).json({ message: "Failed to fetch expense stats" });
  }
};