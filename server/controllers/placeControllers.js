const imageDownloader = require("image-downloader");
const fs = require("fs");
const Place = require("../models/Place");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
};

const uploadPhoto = (req, res) => {
  console.log(req.files);
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("controllers\\uploads\\", ""));
    console.log(newPath.replace("controllers\\uploads\\", ""));
  }
  res.json(uploadedFiles);
};

const addPlace = (req, res) => {
  const { token } = req.cookies;

  // Check if the token exists before proceeding
  if (!token) {
    return res.status(401).json({ error: "JWT must be provided" });
  }

  console.log(token);

  const {
    name,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
  } = req.body;
  console.log(req.body);
  // Verify the token
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid JWT" });
    }

    try {
      // Create the new place with the provided data
      const placeDoc = await Place.create({
        owner: user.id,
        name,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
      });
      res.json(placeDoc);
    } catch (error) {
      console.error("Error creating place:", error);
      res.status(500).json({ error: "Failed to create place" });
    }
  });
};
module.exports = { uploadByLink, uploadPhoto, addPlace };
