// import React, { useState } from "react";
// import "../styles/Stocks.css";

// function Stocks() {
//   const [stockId, setStockId] = useState("");
//   const [result, setResult] = useState(null);

//   const fetchStock = async () => {
//     try {
//       const response = await fetch(`/api/stocks/${stockId}`);
//       const data = await response.json();
//       setResult(data);
//     } catch (error) {
//       setResult({ error: "No se pudo obtener la información del stock." });
//     }
//   };

//   return (
//     <div className="stocks-container">
//       <h1 className="stocks-title">Selecciona tu Stock</h1>
//       <div className="stocks-input-container">
//         <input
//           type="text"
//           className="stocks-input"
//           value={stockId}
//           onChange={(e) => setStockId(e.target.value)}
//           placeholder="ID del Stock"
//         />
//         <button className="stocks-button" onClick={fetchStock}>Consultar</button>
//       </div>
//       {result && (
//         <div className="stocks-result">
//           <h3>Resultado:</h3>
//           <pre>{JSON.stringify(result, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Stocks;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Stocks.css"

function Stocks() {
  const [stockId, setStockId] = useState("");
  const [result, setResult] = useState(null);
  const { token } = useAuth();

  const fetchStock = async () => {
    setResult(null);
    try {
      const response = await fetch(`/api/stocks/${Number(stockId)}`, {  // Convierte a número
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener la información del stock: ${response.statusText}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    }
  };
  

  return (
    <div className="container">
      <h1>Selecciona tu Stock</h1>
      <input
        type="text"
        placeholder="ID del Stock"
        value={stockId}
        onChange={(e) => setStockId(e.target.value)}
      />
      <button onClick={fetchStock}>Consultar</button>
      {result && <div className="result"><pre>{JSON.stringify(result, null, 2)}</pre></div>}
    </div>
  );
}

export default Stocks;
