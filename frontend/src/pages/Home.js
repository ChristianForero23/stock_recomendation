import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a Stock by Choice</h1>
      <p className="home-description">
        Gestiona tu portafolio y selecciona las mejores acciones para invertir.
      </p>
      {/* <div className="home-buttons">
        <a href="/portfolio" className="button">Gestiona tu Portafolio</a>
        <a href="/stocks" className="button">Selecciona tu Stock</a>
      </div> */}
    </div>
  );
}

export default Home;
