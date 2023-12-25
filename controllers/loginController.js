const nodemailer = require("nodemailer");
const Patient = require("../models/patient.model");

// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP to the user's email
const send = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_ID}`, // Update with your Gmail email
      pass: `${process.env.PASS}`, // Update with your Gmail password
    },
  });

  const mailOptions = {
    from: `${process.env.EMAIL_ID}`,
    to: email,
    subject: "OTP for Login",
    text: `Your OTP for login is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const existeduser = await Patient.findOne({ email });
    if (existeduser) {
      const otp = generateOTP();

      // Store OTP in the database
      await Patient.findOneAndUpdate(
        { email },
        { otp },
        { upsert: true, new: true }
      );

      // Send OTP to the user's email
      await send(email, otp);

      res.status(200).json({ message: "OTP sent successfully", existeduser });
    } else {
      res.status(201).json({ message: "please first register the user" });
    }
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const registerPatient = async (req, res) => {
  console.log(req.body);
  const { name, age, email, gender, phoneNumber } = req.body;

  try {
    const existeduser = await Patient.findOne({ email });
    if (existeduser) {
      const otp = generateOTP();

      // Store OTP in the database
      await Patient.findOneAndUpdate(
        { email },
        { otp },
        { upsert: true, new: true }
      );

      // Send OTP to the user's email
      await send(email, otp);

      res.status(200).json({ message: "OTP sent successfully", existeduser });
    }
    // Create a new user instance
    const newUser = new Patient({ name, age, email, gender, phoneNumber });

    // Save the user to the database
    await newUser.save();
    if (newUser) {
      const otp = generateOTP();

      // Store OTP in the database
      await Patient.findOneAndUpdate(
        { email },
        { otp },
        { upsert: true, new: true }
      );

      // Send OTP to the user's email
      await send(email, otp);

      res.json({ message: "Registration successful", newUser });
    }
  } catch (error) {
    console.error("Registration failed:", error.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(req.body);

    // Retrieve stored OTP from the database
    const storedOTP = await Patient.findOne({ email });

    if (storedOTP && otp === storedOTP.otp) {
      // OTP verification successful
      res.status(200).json({ message: "OTP verified successfully" });
      console.log("verified successfully");
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerPatient, sendOtp, verifyOtp };
