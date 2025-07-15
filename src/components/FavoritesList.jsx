import React from 'react';

function FavoritesList({ favorites, removeFavorite }) {
  if (!favorites.length) return <p>No favorites yet.</p>;

  return (
    <ul className='space-y-4'>
      {favorites.map((poke) => (
        <li
         key={poke.id} 
         className='flex items-center justify-between bg-white border p-2 rounded'>
          <div>
            <div className='font-medium'>
              #{poke.id} {poke.name}
            </div>
            <p>Type: {poke.types?.join(', ')}</p>
          </div>
          <div className='flex items-center gap-4'>
            <img src={poke.image} alt={poke.name} className='w-12 h-12' />
            <button
             onClick={() => removeFavorite(poke.name)}
              className='px-2 py-1 bg-red-400 text-white rounded'>
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;