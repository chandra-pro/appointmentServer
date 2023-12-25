const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  clinics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clinic" }],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
