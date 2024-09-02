const express = require("express");
const userController = require("../controllers/userControllers");
console.log(userController);
const router = express.Router();

router.post("/register", userController.registerUser);

module.exports = router;
