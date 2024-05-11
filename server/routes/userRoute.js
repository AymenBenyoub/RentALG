const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage: storage });
router.get("/me", verifyToken.verifyToken, userController.getCurrentUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", userController.getUserById);
router.patch(
  "/profilepic/:id",
  verifyToken.verifyToken,
  upload.single("profilePic"),
  userController.addProfilePicture
);
// router.post("/logout", userController.logout);

module.exports = router;
