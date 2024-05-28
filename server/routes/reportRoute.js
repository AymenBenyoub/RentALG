const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// router.post("/accommodations", reportController.createAccommodationReport);

router.post("/", reportController.createReport);

router.get("/", reportController.getAllReports);

router.get("/:id", reportController.getReportById);

router.delete("/:id", reportController.deleteReport);

module.exports = router;
