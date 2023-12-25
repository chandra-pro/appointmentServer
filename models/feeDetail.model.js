const mongoose = require("mongoose");

const feeDetailsSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
  fee: { type: Number, required: true },
  currency: { type: String, default: "USD" },
});

const FeeDetail = mongoose.model("FeeDetail", feeDetailsSchema);

module.exports = FeeDetail;
