const imageDownloader = require("image-downloader");
const fs = require("fs");
const Place = require("../models/Place");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

// controller to upload picture using link
const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
};

// controller to upload photo using button
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

// controller to add a new place
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
    price,
  } = req.body;
  console.log(req.body);
  // Verify the token
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid JWT" });
    }

    try {
      console.log(user);
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
        price,
      });
      res.json(placeDoc);
    } catch (error) {
      console.error("Error creating place:", error);
      res.status(500).json({ error: "Failed to create place" });
    }
  });
};

// controller to get all places for a specific user
const getPlaces = (req, res) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    const { id } = user;
    console.log(user);
    res.json(await Place.find({ owner: id }));
    if (err) {
      return res.status(403).json({ error: "Invalid JWT" });
    }
  });
};

// controller to get single place for a specific user
const getSinglePlace = async (req, res) => {
  const { id } = req.params;
  console.log("get single place");
  res.json(await Place.findById(id));
};

// controller to update a place
const updatePlace = async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    name,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    const placeDoc = await Place.findById(id);
    console.log(placeDoc);
    if (user.id === placeDoc.owner.toString()) {
      console.log(user.id);
      console.log(placeDoc.owner.toString());
      placeDoc.set({
        name,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
};

const getAllPlaces = async (req, res) => {
  const allPlaces = await Place.find();
  res.json(allPlaces);
};
module.exports = {
  uploadByLink,
  uploadPhoto,
  addPlace,
  getPlaces,
  getSinglePlace,
  updatePlace,
  getAllPlaces,
};
