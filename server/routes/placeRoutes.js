const express = require("express");
const place = require("../controllers/placeControllers");
const multer = require("multer");

const router = express.Router();

router.post("/upload-by-link", place.uploadByLink);

const photosMiddleware = multer({ dest: "controllers/uploads" });
router.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  place.uploadPhoto
);

router.post("/addplaces", place.addPlace);
module.exports = router;
