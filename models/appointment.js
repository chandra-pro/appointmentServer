const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    clinic: {
      type: Schema.Types.ObjectId,
      ref: "Clinic",
      // required: true,
    },
    slot: { type: Schema.Types.ObjectId, ref: "Slot", required: true },
    appointmentDate: { type: String, required: true },
    slotTime: { type: String, default: Date.now },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Clinic", appointmentSchema);

module.exports = Appointment;
