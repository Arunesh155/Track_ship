const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }, // Use ObjectId for reference
  employeeName: String, // Storing employee name directly
  title: String,
  amount: Number,
  date: String,
  description: String,
  billImage: String,
  paymentStatus: { type: String, default: "Not Paid" }, // Defaults to "Not Paid"
  status: { type: String, default: "waiting" }, // Default status set to "waiting"
  rejectionReason: { type: String, default: "" },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
