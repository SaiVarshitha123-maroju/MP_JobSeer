import React from "react";
import { useNavigate } from "react-router-dom";

function StartQuestionnairePage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>🔍 Job Recommendations</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={() => navigate("/job-recommendations")}
          style={{
            padding: 10,
            width: "100%",
            background: "#dabfff",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          📋 Start Questionnaire
        </button>
        <button
          onClick={() => navigate("/tarot")}
          style={{
            padding: 10,
            width: "100%",
            background: "#dabfff",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🔮 Tarot-Based Recommendation
        </button>
      </div>
    </div>
  );
}

export default StartQuestionnairePage;
