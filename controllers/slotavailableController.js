const mongoose = require("mongoose");
const Slot = require("../models/slot.model");
const Doctor = require("../models/doctor.model");
const SlotAvailable = async (req, res) => {
  const doctorId = req.query.doctorID;
  const date = req.query.date;
  try {
    console.log("Doctor ID:", doctorId, date);

    const doctorSlots = await Slot.find({ doctor: doctorId, date: date });

    console.log("Doctor Slots:", doctorSlots);

    if (doctorSlots.length === 0) {
      return res.status(404).json({ message: "No slots found for the doctor" });
    }

    res.json(doctorSlots);
  } catch (error) {
    console.error("Error finding doctor slots:", error.message);
    res.status(500).json({ message: "Error finding doctor slots" });
  }
};
const AllDoctors = async (req, res) => {
  try {
    const doctorSlots = await Doctor.find();

    // console.log("Doctor Slots:", doctorSlots);

    if (doctorSlots.length === 0) {
      return res.status(404).json({ message: "No slots found for the doctor" });
    }

    res.status(200).json(doctorSlots);
    // console.log(doctorSlots);
  } catch (error) {
    console.error("Error finding doctor slots:", error.message);
    res.status(500).json({ message: "Error finding doctor slots" });
  }
};
module.exports = { SlotAvailable, AllDoctors };
