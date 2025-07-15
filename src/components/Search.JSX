import React, { useState } from 'react';
import useSearch from '../hooks/useSearch';
import SearchForm from './SearchForm';
import PokemonCard from './PokemonCard';
import FavoritesList from './FavoritesList';

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
          <SearchForm
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
          <PokemonCard
            pokemonData={pokemonData}
            description={description}
            handleFavorite={handleFavorite}
          />
        </>
      )}

      {showFavoritesOnly && (
        <div className=''>
          <h2 className=''>Your Favorites</h2>
          <FavoritesList
            favorites={favorites}
            removeFavorite={removeFavorite}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
