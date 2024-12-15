import React, { useState } from "react";
import "../styles/Stocks.css";

function Stocks() {
  const [stockId, setStockId] = useState("");
  const [result, setResult] = useState(null);

  const fetchStock = async () => {
    try {
      const response = await fetch(`/api/stocks/${stockId}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "No se pudo obtener la información del stock." });
    }
  };

  return (
    <div className="stocks-container">
      <h1 className="stocks-title">Selecciona tu Stock</h1>
      <div className="stocks-input-container">
        <input
          type="text"
          className="stocks-input"
          value={stockId}
          onChange={(e) => setStockId(e.target.value)}
          placeholder="ID del Stock"
        />
        <button className="stocks-button" onClick={fetchStock}>Consultar</button>
      </div>
      {result && (
        <div className="stocks-result">
          <h3>Resultado:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Stocks;
