const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.createReview);

router.get("/", reviewController.getAllReviews);

router.get("/:id", reviewController.getReviewById);

router.get(
  "/accommodation/:accommodationId",
  reviewController.getReviewsByAccommodationId
);
router.get("/user/:hostId", reviewController.getReviewsForUser);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
