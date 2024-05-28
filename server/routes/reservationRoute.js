const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.post("/", reservationController.createReservation);

router.get("/", reservationController.getAllReservations);
router.get(
  "/me/:host_id",
  reservationController.getReservationsForMyAccommodations
);

router.get("/:id", reservationController.getReservationById);
router.get(
  "/user/accommodation/:id",
  reservationController.getReservationsWithHousesByUserId
);
router.get("/user/:userId", reservationController.getReservationsByUserId);
router.get("/user/:userId/:listingId", reservationController.hasBooked);
router.get(
  "/accommodation/:accommodationId",
  reservationController.getReservationsByListingId
);
router.delete(
  "/:id",

  reservationController.deleteReservation
);

module.exports = router;


