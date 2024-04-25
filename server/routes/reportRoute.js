// routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/", reportController.getAllReports);
router.post("/create", reportController.createReport);
router.get("/:id", reportController.getReportById);

module.exports = router;
