const db = require("../config/database");

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
      payment_method,
      amenities,
    } = JSON.parse(req.body.formData);
    if (req.files.length === 0) {
      res.status(400).JSON({ error: "no files found" });
      console.log("req.files:", req.files);
    }
    const pictures = req.files.map((file) => file.path.replace(/\\/g, "/"));

    const amenityList = Object.keys(amenities);

    const [result] = await connection.query(
      "INSERT INTO accommodations ( host_id, accommodation_type,title, description, price_per_night, max_guests, pictures, location, payment_type, amenities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
      [
        host_id,
        accommodation_type,
        title,
        description,
        price_per_night,
        max_guests,
        JSON.stringify(pictures),
        location,
        payment_method,
        JSON.stringify(amenityList),
      ]
    );

    const accommodationId = result.insertId;
    res.status(201).json({
      message: "Accommodation created successfully",
      accommodationId,
    });
    console.log("Accommodation created successfully");
  } catch (error) {
    console.error("Error creating accommodation:", error);
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
      payment_method,
      amenities,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const pictures = req.files.map((file) => file.filename);
    const amenityList = JSON.parse(amenities);
    // const amenityList = Object.entries(amenities).reduce(
    //   (acc, [key, value]) => {
    //     if (value) {
    //       acc.push(key);
    //     }
    //     return acc;
    //   },
    //   []
    // );

    await connection.query(
      "UPDATE accommodations SET accommodation_type = ?, title = ?, description = ?, price_per_night = ?, max_guests = ?, pictures = ? , location = ?, payment_method = ?, amenities = ? WHERE id = ?",
      [
        accommodation_type,
        title,
        description,
        price_per_night,
        max_guests,
        JSON.stringify(pictures),
        location,
        payment_method,
        JSON.stringify(amenityList),
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
    try {
      accommodation.pictures = JSON.parse(accommodation.pictures);
      accommodation.amenities = JSON.parse(accommodation.amenities);
    } catch (e) {
      console.log(e.message);
    }
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
    // try {
    //   rows.forEach((accommodation) => {
    //     accommodation.pictures = JSON.parse(accommodation.pictures);
    //     accommodation.amenities = JSON.parse(accommodation.amenities);
    //   });
    // } catch (e) {
    //   console.error("error parsing json: ", e);
    // }

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
    try {
      rows.forEach((accommodation) => {
        accommodation.pictures = JSON.parse(accommodation.pictures);
        accommodation.amenities = JSON.parse(accommodation.amenities);
      });
    } catch (e) {
      console.log(e.message);
    }

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
