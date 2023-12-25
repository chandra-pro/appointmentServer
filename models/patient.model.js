const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  age: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  phoneNumber: { type: String, required: true },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
