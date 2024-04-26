const db = require("../config/database");

// Create a new review
exports.createReview = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { rating, reviewer_id, accommodation_id, review_text } = req.body;

    const [result] = await connection.query(
      "INSERT INTO reviews (rating, reviewer_id, accommodation_id,review_text) VALUES (?, ?, ?,?)",
      [rating, reviewer_id, accommodation_id, review_text]
    );

    const reviewId = result.insertId;
    res.status(201).json({ message: "Review created successfully", reviewId });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM reviews");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { id } = req.params;
    const [rows] = await connection.query(
      "SELECT * FROM reviews WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get reviews by accommodation ID
exports.getReviewsByAccommodationId = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { accommodationId } = req.params;
    const [rows] = await connection.query(
      "SELECT * FROM reviews WHERE accommodation_id = ?",
      [accommodationId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching reviews by accommodation ID:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { id } = req.params;
    await connection.query("DELETE FROM reviews WHERE id = ?", [id]);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
