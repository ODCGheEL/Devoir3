// app.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors")
const bookRoutes = require("./routes/book");

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB 👌");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes
app.use("/api/books", bookRoutes);

module.exports = app;
