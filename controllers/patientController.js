// controllers/patientController.js
const PrescriptionRequest = require("../models/prescriptionRequest");
const User = require("../models/user");
// exports.getDashboard = (req, res) => {
//   const user = req.session.user;

//   // ✅ Check if user is logged in & is a patient
//   if (!user || user.role !== "patient") {
//     return res.redirect("/login");
//   }
//   // ✅ Send user data to EJS page
//   res.render("dashboards/patient", { user });
// };

exports.getProfile = async (req, res) => {
  try {
    const user = req.session.user; // 👈 user session se le rahe
    if (!user) {
      return res.send("User not logged in");
    }
    if (user.dob && typeof user.dob === "string") {
      user.dob = new Date(user.dob);
    }

    res.render("dashboards/patient/profile", { user }); // 👈 user ko EJS me pass kar rahe
  } catch (error) {
    console.error("Profile render error:", error);
    res.status(500).send("Error loading profile");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.session.user._id;

    const updatedData = {
      name: req.body.name,
      dob: req.body.dob,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      language: req.body.language,
      bloodGroup: req.body.bloodGroup,
      height: req.body.height,
      weight: req.body.weight,
      medicalHistory: req.body.medicalHistory,
    };

    // DB me update
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    // Session update
    req.session.user = updatedUser;

    res.redirect("/patient/profile"); // 🔁 wapas profile page
  } catch (error) {
    console.error("Update error:", error);
    res.send("❌ Profile update failed.");
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.session.user?._id;

    if (!userId) return res.redirect("/login");

    const user = await User.findById(userId);

    if (!user) return res.send("User not found");

    const age = user.dob
      ? Math.floor(
          (Date.now() - new Date(user.dob)) / (1000 * 60 * 60 * 24 * 365.25)
        )
      : null;

    const today = new Date();
    const todayDateOnly = today.toISOString().split("T")[0];

    const appointment = await PrescriptionRequest.findOne({
      patient: userId,
      status: "approved",
      appointmentDate: {
        $gte: new Date(todayDateOnly),
        $lt: new Date(todayDateOnly + "T23:59:59"),
      },
    }).populate("doctor");

    res.render("dashboards/patient", {
      user,
      age,
      appointment,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
