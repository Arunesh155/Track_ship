const mongoose = require("mongoose");

const ApprovedExpenseSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }, // Use ObjectId for reference
  employeeName: String, // Storing employee name directly
  title: String,
  amount: Number,
  date: String,
  description: String,
  billImage: String,
  paymentStatus: { type: String, default: "Not Paid" }, // Defaults to "Not Paid"
  approvedAt: { type: Date, default: Date.now }, // Automatically set approval time
});

module.exports = mongoose.model("ApprovedExpense", ApprovedExpenseSchema);
