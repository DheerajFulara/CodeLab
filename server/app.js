require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const userRoutes = require("./routes/user");
const staticRoutes = require("./routes/staticroutes");
const sessionRoutes = require('./routes/sessionRoutes');
const path = require("path");


const app = express();
const PORT = 3000;

// ✅ 1. CORS middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ 2. Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ 3. View engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ✅ 4. Database
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log("Error while connecting Database:", e.message));

// ✅ 5. Routes
app.use("/user", userRoutes);
app.use("/", staticRoutes);
app.use('/api', sessionRoutes);

app.use((req, res) => {
  console.log("Unhandled route:", req.method, req.url);
  res.status(404).send("Not Found");
});

// ✅ 6. Server start
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
