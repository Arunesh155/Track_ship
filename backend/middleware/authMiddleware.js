const jwt = require("jsonwebtoken");
const Employee = require("../models/employeeModel");


const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // 🔐 use your secret key
    req.employeeId = decoded.id;
    req.employeeName = decoded.name; // include name in token when signing
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const verifyEmployee = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "your_secret_key");

    const employee = await Employee.findById(decoded.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // ✅ Attach employee ID and name to request
    req.employeeId = employee._id;
    req.employeeName = employee.name;

    next();
  } catch (err) {
    console.error("Verify Employee Error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyEmployee;
module.exports = authenticate;
