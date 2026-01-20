const express = require("express");
const router = express.Router();

const {
  register,
  login,
  registerPage,
  logout,
} = require("../controllers/authController");

const { protect, authorizeRoles } = require("../middlewares/authMiddlewares");

const User = require("../models/user");

// Signup page
router.get("/", registerPage);

// Login page
router.get("/login", (req, res) => {
  res.render("login.ejs", {
    error: req.query.error || null,
    success: req.query.success || null,
  });
});

// Auth actions
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// 👤 USER DASHBOARD
router.get("/dashboard", protect, authorizeRoles("user"), async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.render("dashboard.ejs", { user, error: null, success: null });
});

// 🔐 ADMIN DASHBOARD
router.get("/admin", protect, authorizeRoles("admin"), async (req, res) => {
  const users = await User.find();
  res.render("admin.ejs", {
    users,
    error: req.query.error || null,
    success: req.query.success || null,
  });
});

module.exports = router;
