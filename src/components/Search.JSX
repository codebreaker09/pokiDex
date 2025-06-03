import React, { useState } from 'react';

function Search() {
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
        console.log(data);
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
          className='p-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400'
        />
        <button
          onClick={handleSearch}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
        >
          Search
        </button>
      </div>

      {pokemon && (
        <div className='bg-white rounded-lg shadow-lg p-6 w-80 text-center border-2 border-red-300'>
          <h2 className='text-2xl font-semibold capitalize mb-2'>
            {pokemon.name}
          </h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className='mx-auto mb-4 w-32 h-32'
          />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Type: {pokemon.types.map((t) => t.type.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
