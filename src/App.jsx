import React, { useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Pokemon no found');
        }
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
      })
      .catch((err) => {
        console.error(err, 'Error');
        setPokemon(null);
      });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-100 to-white flex flex-col items-center p-6 font-sans'>
      <h1 className='text-4xl font-bold text-red-600 mb-6'>Pokedex</h1>
      <div className='flex gap-2 mb-8'>
        <input
        type='text'
        placeholder='Enter Pokemon name or ID'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      </div>

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Type: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
