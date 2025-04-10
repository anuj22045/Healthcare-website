const express = require("express");
const router = express();
// console.log("__dirname:", __dirname);
const doctorController = require("../controllers/doctorController");
const { isAuthenticated, ensureDoctor } = require("../middleware/auth");
const { getDashboard } = doctorController;
// Optional: Debug log (sahi kaam kar raha hai)
console.log("Doctor Controller:", doctorController);
console.log("GET DASHBOARD:", doctorController.getDashboard);

// console.log(typeof isAuthenticated);
router.get("/doctor", isAuthenticated, ensureDoctor, getDashboard);

router.get(
  "/doctor/prescription-requests",
  isAuthenticated,
  ensureDoctor,
  doctorController.getPrescriptionRequests
);

router.post(
  "/doctor/approve/:id",
  isAuthenticated,
  ensureDoctor,
  doctorController.approveRequest
);

router.post(
  "/doctor/reject/:id",
  isAuthenticated,
  ensureDoctor,
  doctorController.rejectRequest
);

module.exports = router;
