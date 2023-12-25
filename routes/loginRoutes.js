const router = require("express").Router();
const Doctor = require("../models/doctor.model");
const Slot = require("../models/slot.model");
const {
  registerPatient,
  sendOtp,
  verifyOtp,
} = require("../controllers/loginController");
const {
  SlotAvailable,
  AllDoctors,
} = require("../controllers/slotavailableController");
const { SlotBook } = require("../controllers/slotBookController");

router.post("/register", registerPatient);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/slots/available", SlotAvailable);
router.get("/alldoctors", AllDoctors);
router.post("/slotbook", SlotBook);
// const Doctor = require("../models/doctor");

module.exports = router;
