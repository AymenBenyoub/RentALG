const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.post("/accommodations", reportController.createAccommodationReport);

router.post("/users", reportController.createUserReport);

router.get("/", reportController.getAllReports);

router.get("/:id", reportController.getReportById);

router.delete("/:id", reportController.deleteReport);

module.exports = router;
