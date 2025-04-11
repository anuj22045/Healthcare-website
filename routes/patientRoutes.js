const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const patientController = require("../controllers/patientController");
const PrescriptionRequest = require("../models/prescriptionRequest");
const User = require("../models/user");
const { isAuthenticated, ensurePatient } = require("../middleware/auth"); //ye middleware require kar rhe hai

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get(
  "/patient",
  isAuthenticated,
  ensurePatient,
  patientController.getDashboard
);

//  Profile Page Route (/profile)

router.get(
  "/patient/profile",
  isAuthenticated,
  ensurePatient,
  patientController.getProfile
);

//  Profile Update hoga ye api se
router.post(
  "/patient/profile",
  isAuthenticated,
  ensurePatient,
  patientController.updateProfile
);

router.post(
  "/patient/request",
  ensurePatient,
  upload.fields([
    { name: "report", maxCount: 1 },
    { name: "symptomImages", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const { doctor, issue } = req.body;
      const patientId = req.session.user._id;

      const newRequest = new PrescriptionRequest({
        patient: patientId,
        doctor,
        issue,
        report: req.files["report"]
          ? req.files["report"][0].filename
          : undefined,
        symptomImages: req.files["symptomImages"]
          ? req.files["symptomImages"].map((file) => file.filename)
          : [],
      });

      await newRequest.save();
      req.session.successMessage = "Prescription request sent successfully!";
      res.redirect("/patient/request");
    } catch (error) {
      console.error("Error submitting prescription request:", error);
      res.status(500).send("Something went wrong");
    }
  }
);

router.get("/patient/request", ensurePatient, async (req, res) => {
  const doctors = await User.find({ role: "doctor", isApproved: true });
  const successMessage = req.session.successMessage;
  delete req.session.successMessage;
  res.render("dashboards/patient/requests", {
    user: req.session.user,
    doctors,
    successMessage,
  });
});

module.exports = router;
