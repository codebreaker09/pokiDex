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
    removeFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly,
  } = useSearch();

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-100 to-white flex flex-col items-center p-6 font-sans'>
      <h1 className='text-4xl font-bold text-red-600 mb-6'>Pokedex</h1>
      <button
       onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        className='mb-6 px-4 py-2 bg-blue-500 text-white rounded'
        >
        {showFavoritesOnly ? 'Show Search' : 'Show Favorites'}
      </button>
      {!showFavoritesOnly && (
        <>
          <div className='flex gap-2 mb-8'>
            <input
              type='text'
              placeholder='Enter Pokemon name of ID'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='p-2 border rounded'
            />
            <button onClick={handleSearch}
             className='bg-green-500 text-white px-4 py-2'>
              Search
            </button>
          </div>

          {pokemonData && (
            <div className='border p-4 rounded w-80 bg-white text-center'>
              <h2 className='text-xl font-semibold capitalize mb-2'>{pokemonData.name}</h2>
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
                className='mx-auto mb-2 w-32 h-32'
              />
              <p>Height: {pokemonData.height}</p>
              <p>Weight: {pokemonData.weight}</p>
              <p>
                Type: {pokemonData.types.map((t) => t.type.name).join(', ')}
              </p>
              <p className='mt-2 italic'>{description}</p>

              <button
               onClick={handleFavorite}
               className='mt-3 px-3 py-1 bg-yellow-400 rounded'>
                Add to Favorites
              </button>
            </div>
          )}
        </>
      )}

      {showFavoritesOnly && (
        <div className='w-full max-w-md'>
          <h2 className='text-xl font-bold mb-4 text-center'>Your Favorites</h2>
          {favorites.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            <ul className='space-y-4'>
              {favorites.map((poke, index) => (
                <li
                 key={index}
                 className='flex items-center bg-white justify-between border p-2 rounded'>
                  <div className='flex items-center gap-4'>
                    <img
                     src={poke.image}
                      alt={poke.name} 
                      className='w-12 h-12' />
                    <span className='capitalize font-medium'>{poke.name}</span>
                  </div>
                  <button
                    onClick={() => removeFavorite(poke.name)}
                    className='px-2 py-1 bg-red-400 text-white rounded'
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
