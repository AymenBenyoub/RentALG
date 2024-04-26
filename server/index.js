require("dotenv").config();
const express = require("express");
const app = express();
const db = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoute");
const accommodationRoutes = require("./routes/accommodationRoute");
const reservationRoutes = require("./routes/reservationRoute");
const reviewRoutes = require("./routes/reviewRoute");
const reportRoutes = require("./routes/reportRoute");
const amenitiesRoutes = require("./routes/amenitiesRoute");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reviews", reviewRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/amenities", amenitiesRoutes);
app.listen(3000, () => console.log("listening on port 3000"));
