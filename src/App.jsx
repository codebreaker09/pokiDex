import React, { useEffect, useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.results);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon:', error);
      });
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      <ul>
        {pokemon.map((poke, index) => (
          <li key={index}>{poke.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
