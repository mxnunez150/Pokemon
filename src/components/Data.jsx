import React, { useState } from "react";
import "./Data.css";

const Data = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error("Pokemon no encontrado");
      }
      const data = await response.json();
      setPokemonData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setPokemonData(null);
    }
  };

  return (
    <div>
      <h2>Búsqueda de Pokémon</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            className="custom-input"
            placeholder="Nombre del Pokémon"
          />
          <button type="submit" className="custom-button">
            Buscar <i className="bi bi-search"></i>
          </button>
        </div>
      </form>

      {error ? <p>{error}</p> : null}

      {pokemonData && (
        <div>
          <h3>{pokemonData.name}</h3>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            style={{ width: "200px", height: "200px" }}
          />
          <p>Peso: {pokemonData.weight}</p>
          <p>Altura: {pokemonData.height}</p>
        </div>
      )}
    </div>
  );
};

export default Data;
