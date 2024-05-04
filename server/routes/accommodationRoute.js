// routes/accommodationRoutes.js
const express = require("express");
const router = express.Router();
const accommodationController = require("../controllers/accommodationController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/accommodations");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { files: 10 },
}).array("pictures");

router.get("/", accommodationController.getAllAccommodations);
router.get("/:id", accommodationController.getAccommodationById);
router.post(
  "/create",
  upload,

  accommodationController.createAccommodation
);

module.exports = router;
