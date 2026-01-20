const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, authorizeRoles } = require("../middlewares/authMiddlewares");

// 🔐 ADMIN ONLY ROUTES
router.get("/", protect, authorizeRoles("admin"), getUsers);
router.get("/:id", protect, authorizeRoles("admin"), getUserById);
router.post("/:id/edit", protect, authorizeRoles("admin"), updateUser);
router.post("/:id/delete", protect, authorizeRoles("admin"), deleteUser);

module.exports = router;
