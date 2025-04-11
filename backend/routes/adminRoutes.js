const express = require("express");
const { registerAdmin, loginAdmin, adminDashboard } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/dashboard", authMiddleware, adminDashboard);

module.exports = router;
