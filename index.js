const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./db/index");
const bodyParser = require("body-parser");
const patientRoute = require("./routes/loginRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

//route
app.get("/", async (req, res) => {
  res.send("hello");
});
app.use("/api", patientRoute);
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log("MONGO db connection failed !!! ", err);
  });
