const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login?error=Please login first");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/login?error=Session expired");
  }
};

// 🔐 ROLE BASED ACCESS
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Access Denied");
    }
    next();
  };
};
