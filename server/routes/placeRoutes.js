const express = require("express");
const place = require("../controllers/placeControllers");
const multer = require("multer");
const PlaceModel = require("../models/Place");

const router = express.Router();

// to upload pictures
router.post("/upload-by-link", place.uploadByLink);

const photosMiddleware = multer({ dest: "controllers/uploads" });
router.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  place.uploadPhoto
);

// to add a new place
router.post("/addplaces", place.addPlace);

// to get all places for a specific user
router.get("/place", place.getPlaces);
// to get single place for a specific user
router.get("/place/:id", place.getSinglePlace);

// to update a place
router.put("/updateplace", place.updatePlace);

// get all places for all users
router.get("/allplaces", place.getAllPlaces);

module.exports = router;
