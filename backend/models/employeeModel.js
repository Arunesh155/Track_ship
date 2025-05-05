const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  mobileNo: { type: String, required: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true },
  proofType: { type: String, required: true },
  proofFile: { type: String, required: true },        // Stores path of proof document
  employeePhoto: { type: String, required: true },     // Stores path of employee photo
});

module.exports = mongoose.model("Employee", EmployeeSchema);
