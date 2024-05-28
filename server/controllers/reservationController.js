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
    console.log("Reservation created successfully");
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
exports.getReservationsByListingId = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const accommodation_id = req.params.accommodationId;
    const [rows] = await connection.query(
      "SELECT * FROM reservations WHERE accommodation_id = ?",
      [accommodation_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log("Error fetching reservations by accommodation ID:", error);
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

// Get reservations by user ID with details of the houses reserved
exports.getReservationsWithHousesByUserId = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const userId = req.params.id;

    const [rows] = await connection.query(
      "SELECT r.*, a.* FROM reservations r LEFT JOIN accommodations a ON r.accommodation_id = a.id WHERE r.guest_id = ?",
      [userId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching reservations and houses by user ID:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
exports.hasBooked = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const listingId = req.params.listingId;
    const user_id = req.params.userId;
    const [rows] = await connection.query(
      "SELECT * FROM reservations WHERE accommodation_id = ? AND guest_id = ?",
      [listingId, user_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log("Error checking if user has booked this listing:", error);
    res
      .status(500)
      .json({ error: "Error checking if user has booked this listing:" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

exports.getReservationsForMyAccommodations = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const hostId = req.params.host_id; // Assuming you have middleware to set req.user.id to the currently authenticated user's ID

    // Get accommodations owned by the current user (host)
    const [accommodations] = await connection.query(
      "SELECT id FROM accommodations WHERE host_id = ?",
      [hostId]
    );

    if (accommodations.length === 0) {
      return res
        .status(404)
        .json({ error: "No accommodations found for the host" });
    }

    const accommodationIds = accommodations.map((acc) => acc.id);

    // Get reservations for the accommodations owned by the current user, including guest details and accommodation pictures
    const [reservations] = await connection.query(`
      SELECT r.*, u.first_name, u.last_name, u.phone_number, a.pictures 
       FROM reservations r 
       JOIN users u ON r.guest_id = u.id 
       JOIN accommodations a ON r.accommodation_id = a.id 
       WHERE r.accommodation_id IN (?)`,
      [accommodationIds]
    );

    res.status(200).json(reservations);
  } catch (error) {
    console.error(
      "Error fetching reservations for accommodations owned by the host:",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};