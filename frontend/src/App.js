import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home"; // Importación de la página Home
import Portfolio from "./pages/Portfolio"; // Importación de la página Portfolio
import Stocks from "./pages/Stocks"; // Importación de la página Stocks
import Login from "./pages/Login"; // Importación de la página Login
import Register from "./pages/Register"; // Importación de la página Register
import { AuthProvider, useAuth } from "./context/AuthContext"; // Contexto de autenticación
import "./styles/App.css"; // Importación de estilos CSS

// Ruta protegida para páginas que requieren autenticación
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ocultar/mostrar barra de navegación según el scroll
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
    <AuthProvider>
      <Router>
        {/* Barra de navegación */}
        <nav className={`navbar ${!showNavbar ? "hidden" : ""}`}>
          <div className="navbar-brand">Stock by Choice</div>
          <div
            className="menu-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </div>
          <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/stocks" onClick={() => setIsMenuOpen(false)}>Stock Recommendations</Link>
            </li>
            <li>
              <Link to="/portfolio" onClick={() => setIsMenuOpen(false)}>Wallet Optimization</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Contenido principal */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/portfolio"
              element={
                <ProtectedRoute>
                  <Portfolio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stocks"
              element={
                <ProtectedRoute>
                  <Stocks />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
