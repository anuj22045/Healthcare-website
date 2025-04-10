const mongoose = require("mongoose");

const prescriptionRequestSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  report: String, // optional uploaded report path
  symptomImages: [String], // optional image paths
  date: {
    type: Date,
    default: Date.now,
  },
  appointmentDate: Date,
  appointmentTime: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model(
  "PrescriptionRequest",
  prescriptionRequestSchema
);
