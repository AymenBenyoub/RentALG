
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const path = require("path");
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number, role } =
      req.body;

    if (!first_name || !last_name || !email || !password || !phone_number) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await db.getConnection();

    try {
      const [result] = await connection.query(
        "INSERT INTO users (first_name, last_name, email, password, phone_number, role) VALUES (?, ?, ?, ?, ?, ?)",
        [first_name, last_name, email, hashedPassword, phone_number, role]
      );

      const userId = result.insertId;
      const token = generateToken(userId);
      res
        .status(201)
        .json({ message: "User created successfully", userId, token });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error registering user:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email address already exists" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const connection = await db.getConnection();

    try {
      const [rows] = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = generateToken(user.id);
      res.status(200).json({
        message: "user logged in successfully",
        userId: user.id,
        token,
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const connection = await db.getConnection();

    try {
      const [rows] = await connection.query("SELECT * FROM users ");

      if (rows.length === 0) {
        return res.status(404).json({ error: "There are no users" });
      }

      const users = rows;
      res.status(200).json(users);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const connection = await db.getConnection();

    try {
      const [rows] = await connection.query(
        "SELECT id, first_name, last_name, email, phone_number,profile_picture,is_banned, role FROM users WHERE id = ?",
        [userId]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = rows[0];
      res.status(200).json(user);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query(
        "SELECT id, first_name, last_name, email, phone_number ,profile_picture,is_banned, role FROM users WHERE id = ?",
        [userId]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = rows[0];
      res.status(200).json(user);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addProfilePicture = async (req, res) => {
  try {
    const userId = req.params.id;
    const profilePicture = req.file.path.replace(/\\/g, "/");

    if (!profilePicture) {
      return res.status(400).json({ error: "No profile picture provided" });
    }

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const fileExtension = path.extname(profilePicture).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ error: "Invalid file type" });
    }

    const connection = await db.getConnection();

    try {
      const [result] = await connection.query(
        "UPDATE users SET profile_picture = ? WHERE id = ?",
        [profilePicture, userId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res
        .status(200)
        .json({ message: "Profile picture uploaded successfully" });
      console.log("profile updated");
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.banUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const connection = await db.getConnection();

    try {
      // Update the `is_banned` field of the user
      const [result1] = await connection.query(
        "UPDATE users SET is_banned = 1 WHERE id = ?",
        [userId]
      );

      // Delete associated data from other tables
      await connection.query("DELETE FROM accommodations WHERE host_id = ?", [
        userId,
      ]);
      await connection.query("DELETE FROM reviews WHERE reviewer_id = ?", [
        userId,
      ]);
      await connection.query("DELETE FROM reservations WHERE guest_id = ?", [
        userId,
      ]);
      await connection.query("DELETE FROM reports WHERE reporting_user = ?", [
        userId,
      ]);

      if (result1.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log("user banned");
      res.status(200).json({ message: "User banned successfully" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.unbanUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const connection = await db.getConnection();

    try {
      // Update the `is_banned` field of the user
      const [result1] = await connection.query(
        "UPDATE users SET is_banned = 0 WHERE id = ?",
        [userId]
      );

      if (result1.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log("user unbanned");
      res.status(200).json({ message: "User unbanned successfully" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error unbanning user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
