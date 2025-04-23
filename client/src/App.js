import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";
import SignUpPage from "./Pages/SignUpPage.js";
import LoginPage from "./Pages/LoginPage.js"; // Assuming you have this
import RecommendationsPage from "../src/components/RecommendationsPage.jsx";
import AboutPage from "./Pages/AboutPage.js";
import TarotRecomend from "../src/components/TarotRecommendation.jsx";
import Recommendations from "../src/components/Recomendation.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/job-recommendations" element={<RecommendationsPage />} />
        <Route path="/tarot" element={<TarotRecomend />} />
      </Routes>
    </Router>
  );
}

export default App;
