import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Stocks.css";

function Stocks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStockSymbol, setselectedStockSymbol] = useState(""); // Controla el texto en el input
  const [suggestions, setSuggestions] = useState([]); // Lista de sugerencias
  const [selectedStockId, setSelectedStockId] = useState(null); // ID del stock seleccionado
  const [result, setResult] = useState(null); // Resultado de la búsqueda del stock
  const { token } = useAuth();

  // Obtener sugerencias del backend
  const fetchSuggestions = async (term) => {
    try {
      const response = await fetch(`/api/stocks/search?query=${term}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        // Muestra un error detallado si la respuesta no es correcta
        const errorText = await response.text();
        throw new Error(`Error al obtener sugerencias: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      setSuggestions(data); // Actualiza las sugerencias si todo está bien
    } catch (error) {
      console.error("Error al obtener sugerencias:", error.message);
      setSuggestions([]); // Limpia las sugerencias en caso de error
    }
  };

  // Llamar a la API para obtener detalles del stock
  const fetchStock = async () => {
    setResult(null); // Limpia resultados previos
    if (!selectedStockId) {
      alert("Por favor selecciona un stock de la lista primero.");
      return;
    }
    try {
      const response = await fetch(`/api/stocks/details/${selectedStockSymbol}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener información del stock: ${response.statusText}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error al obtener información del stock:", error.message);
      setResult({ error: error.message });
    }
  };

  // Manejar cambios en el input
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length >= 2) {
      fetchSuggestions(term); // Obtener sugerencias dinámicas
    } else {
      setSuggestions([]); // Limpia sugerencias si no hay suficientes caracteres
    }
  };

  // Manejar clic en una sugerencia
  const handleSuggestionClick = (stock) => {
    setSearchTerm(stock.name); // Actualiza el input con el nombre del stock
    setSelectedStockId(stock.id); // Guarda el ID del stock seleccionado
    setSuggestions([]); // Limpia la lista de sugerencias
    setselectedStockSymbol(stock.symbol); // Actualiza el texto en el input
  };

   // Convertir el resultado JSON en filas de tabla
   const renderTableRows = (data) => {
    return Object.entries(data).map(([key, value]) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    ));
  };
  
  return (
    <div className="stocks-container">
      <div className="stocks-input-container">
        <input
          type="text"
          placeholder="Search for a Stock"
          value={searchTerm}
          onChange={handleInputChange}
          className="stocks-input"
        />
        <button onClick={fetchStock} className="stocks-button">
          Search 
        </button>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((stock) => (
              <li
                key={stock.id}
                onClick={() => handleSuggestionClick(stock)}
                className="suggestion-item"
              >
                {stock.name} ({stock.symbol})
              </li>
            ))}
          </ul>
        )}
      </div>
      {result && (
        <div className="result">
          <h3>Stock Information</h3>
          <table className="json-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(result)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Stocks;
