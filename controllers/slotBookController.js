const Slot = require("../models/slot.model");
const SlotBook = async (req, res) => {
  const doctor = req.query.doctorID;
  const date = req.query.date;
  const slotTime = req.query.time;
  try {
    console.log("Doctor ID:", doctor, date);
    const newSlot = new Slot({ doctor, date, slotTime });

    // Save the user to the database
    await newSlot.save();

    if (newSlot.length === 0) {
      return res.status(404).json({ message: "No slots found for the doctor" });
    }

    res.json(newSlot);
    console.log("booked successsfully");
  } catch (error) {
    console.error("Error finding doctor slots:", error.message);
    res.status(500).json({ message: "Error finding doctor slots" });
  }
};
module.exports = { SlotBook };
