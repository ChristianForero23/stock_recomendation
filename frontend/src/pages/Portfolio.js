// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import "../styles/Portfolio.css";

// function Portfolio() {
//   const [portfolioName, setPortfolioName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [portfolioItems, setPortfolioItems] = useState([]);
//   const { token } = useAuth();

//   // Obtener sugerencias del backend
//   const fetchSuggestions = async (term) => {
//     try {
//       const response = await fetch(`/api/stocks/search?query=${term}`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Error al obtener sugerencias: ${response.status} - ${errorText}`);
//       }

//       const data = await response.json();
//       setSuggestions(data);
//     } catch (error) {
//       console.error("Error al obtener sugerencias:", error.message);
//       setSuggestions([]);
//     }
//   };

//   // Manejar cambios en el input de búsqueda
//   const handleInputChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     if (term.length >= 2) {
//       fetchSuggestions(term);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   // Manejar clic en una sugerencia
//   const handleSuggestionClick = (stock) => {
//     const quantity = prompt(`¿Cuántas acciones de ${stock.name} (${stock.symbol}) deseas agregar?`);
//     if (quantity && !isNaN(quantity) && parseInt(quantity) > 0) {
//       const item = {
//         id: stock.id,
//         name: stock.name,
//         symbol: stock.symbol,
//         quantity: parseInt(quantity),
//       };
//       setPortfolioItems([...portfolioItems, item]);
//       setSuggestions([]);
//       setSearchTerm(""); // Limpia el input
//     } else {
//       alert("Por favor, ingresa una cantidad válida.");
//     }
//   };

//   // Crear el portafolio invocando la API
//   const createPortfolio = async () => {
//     if (!portfolioName.trim()) {
//       alert("Por favor, ingresa un nombre para el portafolio.");
//       return;
//     }

//     try {
//       const response = await fetch("/api/portfolio/create_portfolio", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           portfolio_name: portfolioName,
//           stocks: portfolioItems.map((item) => ({
//             stock_id: item.id,
//             quantity: item.quantity,
//           })),
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Error al crear el portafolio: ${response.status} - ${errorText}`);
//       }

//       alert("¡Portafolio creado exitosamente!");
//       setPortfolioItems([]); // Limpia el panel después de crear el portafolio
//       setPortfolioName(""); // Limpia el nombre del portafolio
//     } catch (error) {
//       console.error("Error al crear el portafolio:", error.message);
//       alert("Ocurrió un error al crear el portafolio.");
//     }
//   };

//   return (
//     <div className="portfolio-container">
//       <div className="portfolio-input-container">
//         <input
//           type="text"
//           placeholder="Nombre del portafolio"
//           value={portfolioName}
//           onChange={(e) => setPortfolioName(e.target.value)}
//           className="portfolio-name-input"
//         />
//         <input
//           type="text"
//           placeholder="Buscar acciones"
//           value={searchTerm}
//           onChange={handleInputChange}
//           className="portfolio-input"
//         />
//         {suggestions.length > 0 && (
//           <ul className="suggestions">
//             {suggestions.map((stock) => (
//               <li
//                 key={stock.id}
//                 onClick={() => handleSuggestionClick(stock)}
//                 className="suggestion-item"
//               >
//                 {stock.name} ({stock.symbol})
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="portfolio-panel">
//         <h3>Acciones seleccionadas</h3>
//         <ul>
//           {portfolioItems.map((item, index) => (
//             <li key={index} className="portfolio-item">
//               {item.name} ({item.symbol}) - {item.quantity} acciones
//             </li>
//           ))}
//         </ul>
//         {portfolioItems.length > 0 && (
//           <button onClick={createPortfolio} className="portfolio-create-button">
//             Crear Portafolio
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Portfolio;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Portfolio.css";

function Portfolio() {
  const [menuVisible, setMenuVisible] = useState(true);
  const [portfolioName, setPortfolioName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const { token } = useAuth();

  // Obtener sugerencias del backend
  const fetchSuggestions = async (term) => {
    try {
      const response = await fetch(`/api/stocks/search?query=${term}`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al obtener sugerencias: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error al obtener sugerencias:", error.message);
      setSuggestions([]);
    }
  };

  // Manejar cambios en el input
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length >= 2) {
      fetchSuggestions(term);
    } else {
      setSuggestions([]);
    }
  };

  // Manejar clic en una sugerencia
  const handleSuggestionClick = (stock) => {
    const quantity = prompt(`¿Cuántas acciones de ${stock.name} (${stock.symbol}) deseas agregar?`);
    if (quantity && !isNaN(quantity) && parseInt(quantity) > 0) {
      const item = {
        id: stock.id,
        name: stock.name,
        symbol: stock.symbol,
        quantity: parseInt(quantity),
      };
      setPortfolioItems([...portfolioItems, item]);
      setSuggestions([]);
      setSearchTerm(""); // Limpia el input
    } else {
      alert("Por favor, ingresa una cantidad válida.");
    }
  };

  // Crear el portafolio invocando la API
  const createPortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio/create_portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          portfolio_name: portfolioName,
          stocks: portfolioItems.map((item) => ({
            stock_id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear el portafolio: ${response.status} - ${errorText}`);
      }

      alert("¡Portafolio creado exitosamente!");
      setPortfolioItems([]); // Limpia el panel después de crear el portafolio
      setPortfolioName("");
      setMenuVisible(true); // Regresar al menú
    } catch (error) {
      console.error("Error al crear el portafolio:", error.message);
      alert("Ocurrió un error al crear el portafolio.");
    }
  };

  // Mostrar menú o panel de creación de portafolio
  return (
    <div className="portfolio-container">
      {menuVisible ? (
        <div className="menu-container">
          <button
            className="menu-button"
            onClick={() => setMenuVisible(false)}
          >
            Crear Portafolio
          </button>
        </div>
      ) : (
        <>
          <div className="portfolio-input-container">
            <input
              type="text"
              placeholder="Nombre del portafolio"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              className="portfolio-name-input"
            />
            <input
              type="text"
              placeholder="Buscar acciones"
              value={searchTerm}
              onChange={handleInputChange}
              className="portfolio-input"
            />
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

          <div className="portfolio-panel">
            <h3>Acciones seleccionadas</h3>
            <ul>
              {portfolioItems.map((item, index) => (
                <li key={index} className="portfolio-item">
                  {item.name} ({item.symbol}) - {item.quantity} acciones
                </li>
              ))}
            </ul>
            {portfolioItems.length > 0 && (
              <button
                onClick={createPortfolio}
                className="portfolio-create-button"
              >
                Crear Portafolio
              </button>
            )}
            <button
              className="menu-button"
              onClick={() => setMenuVisible(true)}
            >
              Volver al menú
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Portfolio;
