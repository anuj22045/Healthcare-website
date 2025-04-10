// routes/patientRoutes.js

const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const { isAuthenticated, ensurePatient } = require("../middleware/auth");

router.get(
  "/patient",
  isAuthenticated,
  ensurePatient,
  patientController.getDashboard
);

// ==========================
// ✅ Profile Page Route (/profile)
// ==========================
router.get(
  "/patient/profile",
  isAuthenticated,
  ensurePatient,
  patientController.getProfile
);

// ✅ Profile Update (POST)
router.post(
  "/patient/profile",
  isAuthenticated,
  ensurePatient,
  patientController.updateProfile
);

module.exports = router;
