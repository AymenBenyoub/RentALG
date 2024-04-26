const db = require("../config/database");

// Create a new reservation
exports.createReservation = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const {
      accommodation_id,
      guest_id,
      check_in_date,
      check_out_date,
      total_price,
      reservation_date,
    } = req.body;

    const [result] = await connection.query(
      "INSERT INTO reservations (accommodation_id, guest_id, check_in_date, check_out_date, total_price, reservation_date) VALUES (?, ?, ?, ?, ?, ?)",
      [
        accommodation_id,
        guest_id,
        check_in_date,
        check_out_date,
        total_price,
        reservation_date,
      ]
    );

    const reservationId = result.insertId;
    res
      .status(201)
      .json({ message: "Reservation created successfully", reservationId });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM reservations");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get a reservation by ID
exports.getReservationById = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { id } = req.params;
    const [rows] = await connection.query(
      "SELECT * FROM reservations WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get reservations by user ID
exports.getReservationsByUserId = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { userId } = req.params;
    const [rows] = await connection.query(
      "SELECT * FROM reservations WHERE guest_id = ?",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching reservations by user ID:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Delete a reservation by ID
exports.deleteReservation = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { id } = req.params;
    await connection.query("DELETE FROM reservations WHERE id = ?", [id]);
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
