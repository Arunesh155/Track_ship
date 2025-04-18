const express = require("express");
const multer = require("multer");
const { registerEmployee, loginEmployee, addExpense, getMyExpenses } = require("../controllers/employeeController");

const router = express.Router();

// Multer Configuration (For File Uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file names
  },
});

const upload = multer({ storage });

// Employee Registration Route
router.post("/register", upload.single("proofFile"), registerEmployee);
router.post("/login", loginEmployee);
router.post("/add-expense",  upload.single("billImage"), addExpense);
router.get("/my-expense", getMyExpenses);



module.exports = router;
