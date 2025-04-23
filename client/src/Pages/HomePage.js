import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css-files/HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check login status

    if (isLoggedIn) {
      navigate("/recommendations"); // Redirect to recommendations page if logged in
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  return (
    <div
      className="homePage"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/js1.webp")`,
      }}
    >
      <header className="header">
        <div className="logo">JOBSEER</div>
        <nav className="nav">
          <Link to="/about" className="navLink">
            ABOUT
          </Link>
          <Link to="/login" className="navLink">
            LOG IN
          </Link>
          <Link to="/signup" className="createButton">
            SIGN UP
          </Link>
        </nav>
      </header>

      <main className="mainContent">
        <h1 className="title">JobSeer</h1>
        <p className="subtitle">
          “Unveil your career destiny, one card at a time.”
        </p>
        <button onClick={handleExploreClick} className="actionButton">
          EXPLORE CAREER PATHS
        </button>
        <p className="tagline">Start your journey today!</p>
      </main>
    </div>
  );
}

export default HomePage;
