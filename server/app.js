const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');

const authRoutes = require("./routes/register");
const sessionRoutes = require("./routes/sessionRoutes");
const { authenticateToken } = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Database Connected"))
  .catch((e) => console.error("❌ Database connection error:", e));

app.use("/api/auth", authRoutes);
app.use("/api/sessions", authenticateToken, sessionRoutes);

module.exports = app;
