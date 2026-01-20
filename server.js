const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ START SERVER ONLY AFTER DB CONNECTS
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Atlas connected");

    app.use("/users", require("./routes/userRoutes"));
    app.use("/", require("./routes/authRoutes"));

    const PORT = process.env.PORT || 5000;

    if (require.main === module) {
      app.listen(PORT, async () => {
        console.log(`🚀 Server running on port ${PORT}`);

        // open browser only in dev
        if (process.env.NODE_ENV === "development" && require.main === module) {
          const { default: open } = await import("open");
          await open("http://localhost:5000/login");
        }
      });
    }
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

startServer();

module.exports = app;
