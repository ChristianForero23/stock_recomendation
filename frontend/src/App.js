import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Stocks from "./pages/Stocks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./styles/App.css"; // Importación de estilos

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/portfolio">Gestiona tu Portafolio</Link>
          <Link to="/stocks">Selecciona tu Stock</Link>
          {/* <Link to="/login">Iniciar sesión</Link> */}
          <Link to="/register">Regístrate</Link>
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
