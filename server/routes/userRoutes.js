const express = require("express");
const userController = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", userController.userProfile);

module.exports = router;
