const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerPage = (req, res) => {
  res.render("signup.ejs", { error: null, success: null });
};
exports.register = async (req, res) => {
  try {
    const { username, email, password, address, contact } = req.body;
    if (!email || !password) {
      return res.render("signup.ejs", {
        error: "All fields required",
        success: null,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render("signup.ejs", {
        error: "Email already registered",
        success: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
      address,
      contact,
    });
    res.render("login.ejs", {
      error: null,
      success: "Registration successful. Please login.",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .render("signup.ejs", { error: "Signup failed", success: null });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

exports.getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("login.ejs", { error: "User not found", success: null });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render("login.ejs", {
      error: "Invalid credentials",
      success: null,
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  // ✅ STORE JWT IN COOKIE
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  // ✅ REDIRECT (NOT RENDER)
  if (user.role === "admin") {
    return res.redirect("/admin");
  } else {
    return res.redirect("/dashboard");
  }
};
