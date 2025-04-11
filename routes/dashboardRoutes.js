const express = require("express");
const router = express.Router();
const User = require("../models/user");
const patientController = require("../controllers/patientController");
const { ensurePatient } = require("../middleware/auth");

//  Middleware: Check agr user login hai
const isLoggedIn = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect("/login");
};

//  DASHBOARDS

router.get("/patient", ensurePatient, patientController.getDashboard);

router.get("/doctor", isLoggedIn, (req, res) => {
  if (req.session.user.role !== "doctor") return res.redirect("/login");
  res.render("dashboards/doctor", { user: req.session.user });
});

router.get("/admin", isLoggedIn, (req, res) => {
  if (req.session.user.role !== "admin") return res.redirect("/login");
  res.render("dashboards/admin", { user: req.session.user });
});

//  Profile (GET + POST)
router.get("/patient/profile", ensurePatient, patientController.getProfile);
router.post("/patient/profile", ensurePatient, patientController.updateProfile);

//  View Doctors Page
// router.get("/patient/doctors", ensurePatient, (req, res) => {
//   res.render("dashboards/patient/doctors", { user: req.session.user });
// });

router.get("/patient/doctors", ensurePatient, async (req, res) => {
  try {
    const approvedDoctors = await User.find({
      role: "doctor",
      isApproved: true,
    });
    res.render("dashboards/patient/doctors", {
      user: req.session.user,
      doctors: approvedDoctors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//  Requests Page
router.get("/patient/requests", ensurePatient, (req, res) => {
  res.render("dashboards/patient/requests", { user: req.session.user });
});

//  Settings Page
router.get("/patient/settings", ensurePatient, (req, res) => {
  res.render("dashboards/patient/settings", { user: req.session.user });
});

module.exports = router;
