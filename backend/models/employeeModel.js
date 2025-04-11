const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  mobileNo: { type: String, required: true },
  proofType: { type: String, required: true },
  proofFile: { type: String, required: true }, // Will store file path
});

module.exports = mongoose.model("Employee", EmployeeSchema);
