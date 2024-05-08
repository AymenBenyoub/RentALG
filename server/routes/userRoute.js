const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/me", verifyToken.verifyToken, userController.getCurrentUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", userController.getUserById);
// router.post("/logout", userController.logout);

module.exports = router;
