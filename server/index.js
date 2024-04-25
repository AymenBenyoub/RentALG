require("dotenv").config();

const express = require("express");
const app = express();
const db = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

db.connect();
app.listen(3000, () => console.log("listening on port 3000"));
