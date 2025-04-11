const PrescriptionRequest = require("../models/prescriptionRequest");

const getDashboard = (req, res) => {
  const user = req.session.user;
  if (!user || user.role !== "doctor") {
    return res.redirect("/login");
  }
  res.render("dashboards/doctor", { user });
};
// console.log("GET DASHBOARD:", doctorController.getDashboard);
const getPrescriptionRequests = async (req, res) => {
  try {
    const doctorId = req.session.user._id;
    const requests = await PrescriptionRequest.find({
      doctor: doctorId,
      status: "pending",
    }).populate("patient");

    res.render("dashboards/doctor/prescriptionRequests", { requests });
  } catch (error) {
    console.error("Error fetching prescription requests:", error);
    res.status(500).send("Internal Server Error");
  }
};

const approveRequest = async (req, res) => {
  await PrescriptionRequest.findByIdAndUpdate(req.params.id, {
    status: "approved",
  });
  res.redirect("/doctor/prescription-requests");
};

const rejectRequest = async (req, res) => {
  await PrescriptionRequest.findByIdAndUpdate(req.params.id, {
    status: "rejected",
  });
  res.redirect("/doctor/prescription-requests");
};

module.exports = {
  getDashboard,
  getPrescriptionRequests,
  approveRequest,
  rejectRequest,
};
