const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  contact: String,
  email: { type: String, unique: true },
  password: String,
  confirmPassword: String,
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
