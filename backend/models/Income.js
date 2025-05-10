const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  courierId: { type: String, required: true },
  courierType: { type: String, required: true }, // e.g., "Domestic", "International"
  receivedAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, // e.g., "Cash", "Card", "UPI"
  date: { type: Date, default: Date.now },
  notes: { type: String }
});

module.exports = mongoose.model("Income", incomeSchema);
