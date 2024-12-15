import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Stocks from "./pages/Stocks";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-item">Inicio</Link>
          </li>
          <li>
            <Link to="/portfolio" className="nav-item">Gestiona tu Portafolio</Link>
          </li>
          <li>
            <Link to="/stocks" className="nav-item">Selecciona tu Stock</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/stocks" element={<Stocks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
