// server.js
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // Load env variables

const app = express();

// DB Connection
connectDB();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
