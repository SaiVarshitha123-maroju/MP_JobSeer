import React from 'react';
import { Link } from 'react-router-dom';

const aboutPageStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#e9ecef', /* Light grey background */
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
};

const containerStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    textAlign: 'center',
};

const headingStyle = {
    fontSize: '32px',
    color: '#343a40',
    marginBottom: '20px',
};

const paragraphStyle = {
    fontSize: '18px',
    color: '#495057',
    lineHeight: '1.6',
    marginBottom: '20px',
};

const backLinkStyle = {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease-in-out',
};

const backLinkHoverStyle = {
    backgroundColor: '#0056b3',
};

function AboutPage() {
    return (
        <div style={aboutPageStyle}>
            <div style={containerStyle}>
                <h2 style={headingStyle}>About Our Career Portal</h2>
                <p style={paragraphStyle}>
                    Welcome to our innovative career portal designed to help you discover exciting job opportunities. We leverage advanced algorithms and even a touch of mystical insight through our unique tarot-based recommendations to guide you on your professional journey.
                </p>
                <p style={paragraphStyle}>
                    Our mission is to empower job seekers with the tools and resources they need to find fulfilling careers. Whether you know exactly what you're looking for or are open to exploring new paths, we're here to assist you every step of the way.
                </p>
                <p style={paragraphStyle}>
                    Feel free to use our standard job search or try our intriguing tarot reading feature for a different perspective on your career potential.
                </p>
                <Link to="/" style={backLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, backLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, backLinkStyle)}>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default AboutPage;