import React from 'react';

function PokemonCard({ pokemonData, description, handleFavorite }) {
  if (!pokemonData) return null;

  return (
    <div className='border p-4 rounded w-80 bg-white text-center'>
      <h2 className='text-xl font-semibold capitalize mb-2'>
        {pokemonData.name}
      </h2>
      <img
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        className='mx-auto mb-2 w-32 h-32'
      />
      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      <p>Type: {pokemonData.types?.map((t) => t.type.name).join(', ')}</p>
      <p className='mt-2 italic'>{description}</p>

      <button
        onClick={handleFavorite}
        className='mt-3 px-3 py-1 bg-yellow-400 rounded'
      >
        Add to Favorites
      </button>
    </div>
  );
}

export default PokemonCard;
