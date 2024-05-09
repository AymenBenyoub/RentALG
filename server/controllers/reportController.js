const db = require("../config/database");

exports.createReport = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const {
      report_reason,
      report_text,
      reporting_user,
      reported_user,
      reported_accommodation,
    } = req.body;

    const [result] = await connection.query(
      "INSERT INTO reports (report_reason, report_text, reporting_user, reported_user,reported_accommodation) VALUES (?, ?, ?, ?,?)",
      [
        report_reason,
        report_text,
        reporting_user,
        reported_user,
        reported_accommodation,
      ]
    );

    const reportId = result.insertId;
    res.status(201).json({ message: "report created successfully", reportId });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// exports.createAccommodationReport = async (req, res) => {
//   let connection;
//   try {
//     connection = await db.getConnection();
//     const {
//       report_reason,
//       report_text,
//       reporting_user,
//       reported_accommodation,
//     } = req.body;

//     const [result] = await connection.query(
//       "INSERT INTO reports (report_reason, report_text, reporting_user, reported_accommodation) VALUES (?, ?, ?, ?)",
//       [report_reason, report_text, reporting_user, reported_accommodation]
//     );

//     const reportId = result.insertId;
//     res
//       .status(201)
//       .json({ message: "Accommodation report created successfully", reportId });
//   } catch (error) {
//     console.error("Error creating accommodation report:", error);
//     res.status(500).json({ error: "Internal server error" });
//   } finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// };

// Get all reports
exports.getAllReports = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM reports");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Get a report by ID
exports.getReportById = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { id } = req.params;
    const [rows] = await connection.query(
      "SELECT * FROM reports WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Delete a report by ID
exports.deleteReport = async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { id } = req.params;
    await connection.query("DELETE FROM reports WHERE id = ?", [id]);
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
