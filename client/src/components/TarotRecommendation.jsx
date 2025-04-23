import React, { useState } from "react";
import axios from "axios";
import tarotData from "../data/tarot-images.json";
import tarotJobs from "../data/tarotJobs.js";
import "../css-files/TarotRecommendation.css";

const TarotRecommendation = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [tarotCards, setTarotCards] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateTarotCards = () => {
    setVideoEnded(false);
    setRecommendations([]);
    setTarotCards([]);
  };

  const handleVideoEnd = () => {
    const shuffled = [...tarotData.cards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    setTarotCards(selected);
    setVideoEnded(true);
  };

  const handleTarotSelect = async (cardName) => {
    const job_titles = tarotJobs[cardName] || [];
    if (job_titles.length === 0) return;

    setLoading(true);
    setRecommendations([]);

    try {
      const res = await axios.post("http://localhost:5000/api/recommend/recommend", {
        job_title: job_titles,
        location: [],
        skills: [],
        industry: [],
      });
      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="tarot-container">
      <button className="shuffle-button" onClick={generateTarotCards}>
        🔮 Tarot Recommendation
      </button>

      {!videoEnded && tarotCards.length === 0 && (
        <div className="shuffle-video-container">
          <video
            autoPlay
            muted
            className="shuffle-video"
            onEnded={handleVideoEnd}
          >
            <source src="/tarotanimation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {videoEnded && tarotCards.length > 0 && (
        <>
          <h2 className="pick-title">🃏 Pick a Tarot Card</h2>
          <div className="card-selection">
            {tarotCards.map((card, idx) => (
              <div
                key={idx}
                className="flip-card"
                onClick={() => handleTarotSelect(card.name)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src="/cards/back.jpg" alt="Tarot back" />
                  </div>
                  <div className="flip-card-back">
                    <img src={`/cards/${card.img}`} alt={card.name} />
                    <p>{card.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {loading && <p>Loading recommendations...</p>}

      {recommendations.length > 0 && (
        <div className="recommendation-list">
          <h2>✨ Recommended Jobs:</h2>
          <ul>
            {recommendations.map((job, index) => (
              <li key={index} className="job-card">
                <h3>{job.job_title}</h3>
                <p>
                  {job.employer_name} - {job.job_country}
                </p>
                <p>
                  <strong>Description:</strong> {job.job_description?.slice(0, 200)}...
                </p>
                <a href={job.job_apply_link} target="_blank" rel="noreferrer">
                  Apply Now
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TarotRecommendation;
