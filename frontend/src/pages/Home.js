import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import techImage1 from "../images/ad_analitycs.png";
import techImage2 from "../images/ai_logo.jpg";
import techImage3 from "../images/optimization.png";
import heroImage from "../images/fondo2.png"; // Imagen de fondo

function Home() {
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.2) {
        setShowNavbar(false); // Ocultar barra
      } else {
        setShowNavbar(true); // Mostrar barra
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      
      {/* Sección principal con imagen de fondo */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Launch Your Financial Future Today</h1>
          <p className="hero-subtitle">Your choice, our insights.</p>
          <button className="hero-button">Try!</button>
        </div>
      </section>

      {/* Sección "Our Technology" */}
      <section className="technology-section">
        <h2 className="section-title">Our Technology</h2>
        <div className="tech-container">
          <div className="tech-item">
            <img src={techImage1} alt="Technology 1" className="tech-image" />
            <h3>Advanced Analytics</h3>
            <p>Advanced analytics for portfolio optimization.</p>
          </div>
          <div className="tech-item">
            <img src={techImage2} alt="Technology 2" className="tech-image" />
            <h3>AI Stock Recommendations</h3>
            <p>Real-time stock recommendations powered by AI.</p>
          </div>
          <div className="tech-item">
            <img src={techImage3} alt="Technology 3" className="tech-image" />
            <h3>Risk Management Tools</h3>
            <p>Intuitive tools for risk management and growth.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
