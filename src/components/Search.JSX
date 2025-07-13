import React, { useState } from 'react';
import useSearch from '../hooks/useSearch';

function Search() {
  const {
    handleSearch,
    search,
    pokemonData,
    setSearch,
    description,
    handleFavorite,
    favorites,
  } = useSearch();

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

      {pokemonData && (
        <div className='bg-white rounded-lg shadow-lg p-6 w-80 text-center border-2 border-red-300'>
          <h2 className='text-2xl font-semibold capitalize mb-2'>
            {pokemonData.name}
          </h2>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className='mx-auto mb-4 w-32 h-32'
          />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Type: {pokemonData.types.map((t) => t.type.name).join(', ')}</p>
          <p>Description: {description}</p>
          <button onClick={handleFavorite} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>Favorite</button>
        </div>
      )}
      <h2>Favorites</h2>
      <ul>
        {favorites.map((poke, index) => (
          <li key={index}>
            {poke.name}
            <img src={poke.image} alt={poke.name} width={50} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
