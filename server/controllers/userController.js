const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number } = req.body;

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
        "INSERT INTO users (first_name, last_name, email, password, phone_number, role) VALUES (?, ?, ?, ?, ?, 'user')",
        [first_name, last_name, email, hashedPassword, phone_number]
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
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const connection = await db.getConnection();

    try {
      const [rows] = await connection.query(
        "SELECT id, first_name, last_name, email, phone_number FROM users WHERE id = ?",
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
        "SELECT id, first_name, last_name, email, phone_number FROM users WHERE id = ?",
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
