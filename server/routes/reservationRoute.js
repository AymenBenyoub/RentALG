const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.get("/", reservationController.getAllReservations);
router.post("/create", reservationController.createReservation);
router.get("/:id", reservationController.getReservationById);

module.exports = router;
