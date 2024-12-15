import React from "react";
import "../styles/Portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">Gestiona tu Portafolio</h1>
      <p className="portfolio-description">
        Aquí podrás manejar tu portafolio de acciones <b>(próximamente)</b>.
      </p>
      <div className="portfolio-image">
        <img src="https://via.placeholder.com/600x300" alt="Portafolio" />
      </div>
    </div>
  );
}

export default Portfolio;
