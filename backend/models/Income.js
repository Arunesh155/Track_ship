// models/Income.js
const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverAddress: { type: String, required: true },
  receiverPhoneNumber: { type: String, required: true },
  courierType: { type: String, enum: ['Domestic', 'International'], required: true },
  receivedAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI'], required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Income', incomeSchema);
