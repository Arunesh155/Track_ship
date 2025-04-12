const express = require("express");
const { registerAdmin, loginAdmin, adminDashboard, getPendingExpenses, approveExpense, rejectExpense } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/dashboard", authMiddleware, adminDashboard);
router.get("/pending-expenses", getPendingExpenses);
router.post("/approve-expense/:id", approveExpense);
router.post("/reject-expense/:id", rejectExpense);

module.exports = router;
