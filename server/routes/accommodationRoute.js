// routes/accommodationRoutes.js
const express = require("express");
const router = express.Router();
const accommodationController = require("../controllers/accommodationController");

router.get("/", accommodationController.getAllAccommodations);
router.get("/:id", accommodationController.getAccommodationById);
router.post("/create", accommodationController.createAccommodation);

module.exports = router;
