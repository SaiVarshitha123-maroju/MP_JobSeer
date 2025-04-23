// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Route imports
const authRoutes = require("./routes/auth.js");
const recommendRoutes = require("./routes/recommend.js");

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/jobseer", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route handlers
app.use("/api/auth", authRoutes); // for /signup and /login
app.use("/api/recommend", recommendRoutes); // for your ML recommend API

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
