require("dotenv").config();
const express = require("express");
const app = express();
const db = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/userRoute");
const accommodationRoutes = require("./routes/accommodationRoute");
const reservationRoutes = require("./routes/reservationRoute");
const reviewRoutes = require("./routes/reviewRoute");
const reportRoutes = require("./routes/reportRoute");

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reviews", reviewRoutes);

app.use("/api/reports", reportRoutes);

app.listen(3000, () => console.log("listening on port 3000"));
