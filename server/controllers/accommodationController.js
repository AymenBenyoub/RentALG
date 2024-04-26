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

exports.createAccommodation = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const {
      host_id,
      accommodation_type,
      title,
      description,
      price_per_night,
      max_guests,
      location,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      console.log("req.files:", req.files);
      return res.status(400).json({ error: "No files uploaded" });
    }

    const pictures = req.files.map((file) => file.filename);
    const [result] = await connection.query(
      "INSERT INTO accommodations (host_id, accommodation_type, title, description, price_per_night, max_guests, pictures,location) VALUES (?, ?, ?, ?, ?, ?, ?,?)",
      [
        host_id,
        accommodation_type,
        title,
        description,
        price_per_night,
        max_guests,
        JSON.stringify(pictures),
        location,
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
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

exports.getAccommodationById = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { id } = req.params;

    const [rows] = await connection.query(
      "SELECT * FROM accommodations WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Accommodation not found" });
    }

    const accommodation = rows[0];
    accommodation.pictures = JSON.parse(accommodation.pictures);
    res.status(200).json(accommodation);
  } catch (error) {
    console.error("Error fetching accommodation:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

exports.getAllAccommodations = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM accommodations");

    rows.forEach((accommodation) => {
      accommodation.pictures = JSON.parse(accommodation.pictures);
    });

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

exports.updateAccommodation = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { id } = req.params;
    const {
      accommodation_type,
      title,
      description,
      price_per_night,
      max_guests,
      location,
    } = req.body;

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Extract filenames or paths from uploaded files
    const pictures = req.files.map((file) => file.filename);

    await connection.query(
      "UPDATE accommodations SET accommodation_type = ?, title = ?, description = ?, price_per_night = ?, max_guests = ?, pictures = ? , location = ? WHERE id = ?",
      [
        accommodation_type,
        title,
        description,
        price_per_night,
        max_guests,
        JSON.stringify(pictures),
        location,
        id,
      ]
    );

    res.status(200).json({ message: "Accommodation updated successfully" });
  } catch (error) {
    console.error("Error updating accommodation:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
exports.getAccommodationsByUser = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { userId } = req.params;

    const [rows] = await connection.query(
      "SELECT * FROM accommodations WHERE host_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Accommodations not found for this user" });
    }

    rows.forEach((accommodation) => {
      accommodation.pictures = JSON.parse(accommodation.pictures);
    });

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching accommodations by user:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
