import React, { useEffect, useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=60')
      .then((res) => res.json())
      .then((data) => {
        console.log('Pokemon:', data.results);
      })
      .catch((error) => {
        console.error('Error fetching Pokemon:', error);
      });
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      <p>Filler for now</p>
    </div>
  );
}

export default App;
