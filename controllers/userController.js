const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { username, password, marks } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    marks,
  });

  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.render("edit-user.ejs", {
    user,
    error: null,
    success: null,
  });
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, role, contact, address } = req.body;
    const userId = req.params.id;

    if (!username || username.length < 3) {
      return res.render("edit-user.ejs", {
        user: { _id: userId, username, email, role, contact, address },
        error: "Username must be at least 3 characters",
        success: null,
      });
    }

    if (!email || !email.includes("@")) {
      return res.render("edit-user.ejs", {
        user: { _id: userId, username, email, role, contact, address },
        error: "Invalid email address",
        success: null,
      });
    }

    if (!["user", "admin"].includes(role)) {
      return res.render("edit-user.ejs", {
        user: { _id: userId, username, email, role, contact, address },
        error: "Invalid role selected",
        success: null,
      });
    }

    if (contact && !/^[0-9]{10}$/.test(contact)) {
      return res.redirect("/admin?error=Contact must be 10 digits");
    }

    await User.findByIdAndUpdate(req.params.id, {
      username,
      email,
      role,
      contact,
      address,
    });

    res.redirect("/admin?success=User updated successfully");
  } catch (err) {
    res.render("edit-user.ejs", {
      user: { _id: req.params.id, ...req.body },
      error: "Something went wrong while updating",
      success: null,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userToDeleteId = req.params.id;
    const loggedInUserId = req.user.id;
    const loggedInUserRole = req.user.role;

    await User.findByIdAndDelete(userToDeleteId);

    if (loggedInUserRole === "admin" && userToDeleteId === loggedInUserId) {
      res.clearCookie("token");
      return res.redirect(
        "/login?success=Your account was deleted. Please login again",
      );
    }

    res.redirect("/admin?success=User deleted successfully");
  } catch (err) {
    res.redirect("/admin?error=Failed to delete user");
  }
};

exports.deleteAll = async (req, res) => {
  await User.find;
};
