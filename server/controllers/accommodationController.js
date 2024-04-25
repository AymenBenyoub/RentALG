const multer = require("multer");
const path = require("path");
const db = require("../config/database");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/accommodations");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

exports.createAccommodation = [
  upload.array("images", 10),
  async (req, res) => {
    try {
      const {
        host_id,
        accommodation_type,
        title,
        description,
        price_per_night,
        max_guests,
      } = req.body;
      const images = req.files.map((file) => file.filename);
      const [result] = await db.query(
        "INSERT INTO accommodations (host_id, accommodation_type, title, description, price_per_night, max_guests, pictures) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          host_id,
          accommodation_type,
          title,
          description,
          price_per_night,
          max_guests,
          JSON.stringify(images),
        ]
      );

      const accommodationId = result.insertId;
      res.status(201).json({
        message: "Accommodation created successfully",
        accommodationId,
      });
    } catch (error) {
      console.error("Error creating accommodation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

exports.getAccommodationById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM accommodations WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Accommodation not found" });
    }

    const accommodation = rows[0];
    accommodation.pictures = JSON.parse(accommodation.pictures);
    res.status(200).json(accommodation);
  } catch (error) {
    console.error("Error fetching accommodation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllAccommodations = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM accommodations");

    rows.forEach((accommodation) => {
      accommodation.pictures = JSON.parse(accommodation.pictures);
    });

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateAccommodation = [
  upload.array("images", 10),
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        host_id,
        accommodation_type,
        title,
        description,
        price_per_night,
        max_guests,
      } = req.body;
      const images = req.files.map((file) => file.filename);

      await db.query(
        "UPDATE accommodations SET accommodation_type = ?, title = ?, description = ?, price_per_night = ?, max_guests = ?, pictures = ? WHERE id = ?",
        [
          accommodation_type,
          title,
          description,
          price_per_night,
          max_guests,
          JSON.stringify(images),
          id,
        ]
      );

      res.status(200).json({ message: "Accommodation updated successfully" });
    } catch (error) {
      console.error("Error updating accommodation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];
