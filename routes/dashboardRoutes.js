const express = require("express");
const router = express.Router();

// Middleware to protect routes
const isLoggedIn = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect("/");
};

router.get("/patient", isLoggedIn, (req, res) => {
  res.render("dashboards/patient", { user: req.session.user });
});

router.get("/doctor", isLoggedIn, (req, res) => {
  res.render("dashboards/doctor", { user: req.session.user });
});

router.get("/admin", isLoggedIn, (req, res) => {
  res.render("dashboards/admin", { user: req.session.user });
});

router.get("/patient/profile", isLoggedIn, (req, res) => {
  res.render("dashboards/patient/profile");
});

///////////////////////////////////////////////////////////////////////

// patient dashboard (HOME)
router.get("/patient", isLoggedIn, (req, res) => {
  res.render("dashboards/patient"); // ✅ NOT dashboards/patient/dashboard
});

// profile page
router.get("/patient/profile", isLoggedIn, (req, res) => {
  res.render("dashboards/patient/profile");
});

// doctors page
router.get("/patient/doctors", isLoggedIn, (req, res) => {
  res.render("dashboards/patient/doctors");
});

// requests page
router.get("/patient/requests", isLoggedIn, (req, res) => {
  res.render("dashboards/patient/requests");
});

// settings page
router.get("/patient/settings", isLoggedIn, (req, res) => {
  res.render("dashboards/patient/settings");
});

module.exports = router;
