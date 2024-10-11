const express = require("express");
const app = express();
const cors = require("cors");
const users = require("./routes/userRoutes");
const places = require("./routes/placeRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(cookieParser());
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("error in connecting to mongodb", err);
  }
};
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/test", (req, res) => {
  res.json("test ok");
});
app.use("/users", users);
app.use("/places", places);
app.use("/uploads", express.static(__dirname + "/controllers/uploads"));
app.listen(4000, () => {
  connect();
  console.log("app running on " + "http://localhost:4000");
});
