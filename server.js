// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

// Route imports
const authRoutes = require("./routes/auth.js");
const recommendRoutes = require("./routes/recommend.js");

const app = express();
const PORT = 5000;

// MongoDB connection
const mongoURI =
  process.env.MONGODB_URI || "mongodb://host.docker.internal:27017/jobseer";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route handlers
app.use("/api/auth", authRoutes); // for /signup and /login
app.use("/api/recommend", recommendRoutes); // for your ML recommend API

// Serve static files from React build (in production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // Serve index.html for any other route (React Router)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
