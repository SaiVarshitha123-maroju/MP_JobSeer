// backend/routes/recommend.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// Helper: build query from user preferences
function buildQuery(userPrefs) {
  const queryParts = [];

  if (userPrefs.job_title) queryParts.push(userPrefs.job_title.join(" OR "));
  if (userPrefs.location) queryParts.push(userPrefs.location.join(" OR "));
  if (userPrefs.skills) queryParts.push(userPrefs.skills.join(" OR "));
  if (userPrefs.industry) queryParts.push(userPrefs.industry.join(" OR "));

  return queryParts.join(" AND ");
}

router.post("/recommend", async (req, res) => {
  const userPreferences = req.body;

  try {
    const query = buildQuery(userPreferences);
    const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: {
        query,
        page: "1",
        num_pages: "1",
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    const jobs = response.data.data || [];
    res.json({ recommendations: jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch job data" });
  }
});
module.exports = router;
