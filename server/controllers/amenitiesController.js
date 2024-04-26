const db = require("../config/database");
exports.getAmenitiesByAccommodationId = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { accommodationId } = req.params;
    const [rows] = await connection.query(
      "SELECT a.* FROM amenities a JOIN accommodation_amenities aa ON a.id = aa.amenity_id WHERE aa.accommodation_id = ?",
      [accommodationId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching amenities by accommodation ID:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
