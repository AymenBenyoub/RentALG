const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.post("/", reservationController.createReservation);

router.get("/", reservationController.getAllReservations);

router.get("/:id", reservationController.getReservationById);

router.get("/user/:userId", reservationController.getReservationsByUserId);

router.delete("/:id", reservationController.deleteReservation);

module.exports = router;
