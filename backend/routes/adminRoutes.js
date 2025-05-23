const express = require("express");
const { registerAdmin, loginAdmin, adminDashboard, getPendingExpenses, approveExpense, rejectExpense, getAllExpenseStats, getExpenseHistory, addIncome, getAllIncomes, getFinancialSummary } = require("../controllers/adminController");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/dashboard", adminDashboard);
router.get("/pending-expenses", getPendingExpenses);
router.post("/approve-expense/:id", approveExpense);
router.post("/reject-expense/:id", rejectExpense);
router.get("/expense-charts", getAllExpenseStats);
router.get("/expense-history", getExpenseHistory);
router.post("/add-income", addIncome);
router.get("/income-history", getAllIncomes);
router.get("/view-summary", getFinancialSummary);


module.exports = router;
