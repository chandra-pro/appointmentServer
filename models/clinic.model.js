const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
  slots: [{ type: mongoose.Schema.Types.ObjectId, ref: "Slot" }],
});

const Clinic = mongoose.model("Clinic", clinicSchema);

module.exports = Clinic;
