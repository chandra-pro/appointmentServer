const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  slotTime: { type: String, required: true },

  date: { type: String, required: true },
  // available: { type: Boolean, default: true },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    // required: true,
  },
  doctor: {
    type: String,
    // ref: "Doctor",
    required: true,
  },
});

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
