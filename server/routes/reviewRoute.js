// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/", reviewController.getAllReviews);
router.post("/create", reviewController.createReview);
router.get("/:id", reviewController.getReviewById);

module.exports = router;
