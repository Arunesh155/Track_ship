const express = require("express");
const { registerAdmin, loginAdmin, adminDashboard, getPendingExpenses, approveExpense, rejectExpense, getAllExpenseStats, getExpenseHistory } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/dashboard", authMiddleware, adminDashboard);
router.get("/pending-expenses", getPendingExpenses);
router.post("/approve-expense/:id", approveExpense);
router.post("/reject-expense/:id", rejectExpense);
router.get("/expense-charts", getAllExpenseStats);
router.get("/expense-history", getExpenseHistory)

module.exports = router;
