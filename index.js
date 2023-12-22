const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./db/index");

const app = express();
app.use(
  cors() //     {
  //     origin: process.env.CORS_ORIGIN,
  //     credentials: true
  // }
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log("MONGO db connection failed !!! ", err);
  });