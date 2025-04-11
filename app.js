// server.js
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();

app.use("/uploads", express.static("uploads"));
const session = require("express-session");

const patientRoutes = require("./routes/patientRoutes"); //patient wala interface ka hai

dotenv.config(); // Load env variables
const dashboardRoutes = require("./routes/dashboardRoutes");

// Serve static files from 'uploads' folder

app.use(
  session({
    secret: "mySecretKey123",
    resave: false,
    saveUninitialized: false,
  })
);

// DB Connection
connectDB();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", dashboardRoutes);
// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

app.use("/", patientRoutes);

app.use("/", doctorRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});

//abhi patientside bar me signout ka logic likhe h but wotking nahi h
