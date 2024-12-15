import React, { useState } from "react";

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
    <div>
      <h1>Selecciona tu Stock</h1>
      <input
        type="text"
        value={stockId}
        onChange={(e) => setStockId(e.target.value)}
        placeholder="ID del Stock"
      />
      <button onClick={fetchStock}>Consultar</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default Stocks;
