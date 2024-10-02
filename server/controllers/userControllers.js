const userModel = require("../models/userSchema.js");
// console.log(userModel);
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

const registerUser = async (req, res) => {
  // console.log(req.body);
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
  res.json({
    user: newUser,
    status: 200,
    message: "User Registration Sucessful",
  });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  // console.log(email);
  const userData = await userModel.findOne({ email });
  // console.log(userData);
  if (userData) {
    // res.json("found");
    const passOk = bcrypt.compareSync(password, userData.password);
    if (passOk) {
      jwt.sign(
        {
          email: userData.email,
          id: userData._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          console.log("token here: ", token);
          res
            .cookie("token", token)
            .json({ status: 200, message: "Login Successful", user: userData });
        }
      );
    } else {
      res.json({ status: 401, message: "Invalid Password" });
    }
  } else {
    res.json("not found");
  }
};

const userProfile = (req, res) => {
  const { token } = req.cookies;
  console.log("cookies: ", req.cookies);
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const userDoc = await userModel.findById(user.id);
      res.json(userDoc);
    });
  } else {
    res.json(null);
  }
};

userLogOut = (req, res) => {
  res.cookie("token", "").json(true);
};
module.exports = { registerUser, loginUser, userProfile };
