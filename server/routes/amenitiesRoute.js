const express = require("express");
const router = express.Router();
const amenitiesController = require("../controllers/amenitiesController");

router.get(
  "/accommodation/:accommodationId",
  amenitiesController.getAmenitiesByAccommodationId
);
module.exports = router;
