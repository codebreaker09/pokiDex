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
    <div className=''>
      <h1 className=''>Pokedex</h1>
      <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
        {showFavoritesOnly ? 'Show Search' : 'Show Favorites'}
      </button>
      {!showFavoritesOnly && (
        <>
          <div className=''>
            <input
              type='text'
              placeholder='Enter Pokemon name of ID'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=''
            />
            <button onClick={handleSearch} className=''>
              Search
            </button>
          </div>

          {pokemonData && (
            <div className=''>
              <h2 className=''>{pokemonData.name}</h2>
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
                className=''
              />
              <p>Height: {pokemonData.height}</p>
              <p>Weight: {pokemonData.weight}</p>
              <p>
                Type: {pokemonData.types.map((t) => t.type.name).join(', ')}
              </p>
              <p>{description}</p>

              <button onClick={handleFavorite} className=''>
                Add to Favorites
              </button>
            </div>
          )}
        </>
      )}

      {showFavoritesOnly && (
        <div className=''>
          <h2 className=''>Your Favorites</h2>
          {favorites.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            <ul className=''>
              {favorites.map((poke, index) => (
                <li key={index} className=''>
                  <div className=''>
                    <img src={poke.image} alt={poke.name} className='' />
                    <span className=''>{poke.name}</span>
                  </div>
                  <button
                    onClick={() => removeFavorite(poke.name)}
                    className=''
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
