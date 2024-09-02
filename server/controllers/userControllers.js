const userModel = require("../models/userSchema.js");
console.log(userModel);
const bcrypt = require("bcryptjs");

const bcryptSalt = bcrypt.genSaltSync(10);
const registerUser = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, contact, password, confirmPassword } =
    req.body;
  const User = {
    firstName,
    lastName,
    email,
    contact,
    password: bcrypt.hashSync(password, bcryptSalt),
    confirmPassword: bcrypt.hashSync(confirmPassword, bcryptSalt),
  };
  const newUser = await userModel.create(User);
  res.json(newUser);
};

module.exports = { registerUser };
