import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Stocks from "./pages/Stocks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./styles/App.css"; // Importación de estilos

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  }

function App() {
  
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
    <AuthProvider>
      <Router>
    
        {/* Barra de navegación */}
        <nav className={`navbar ${!showNavbar ? "hidden" : ""}`}>
          <div className="navbar-brand">Stock by Choice</div>
          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stocks">Stock Recommendations</Link>
            </li>
            <li>
              <Link to="/portfolio">Wallet Optimization</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
            <Route path="/stocks" element={<ProtectedRoute><Stocks /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
