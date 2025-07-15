import React from 'react';

function SearchForm({ search, setSearch, handleSearch }) {
  return (
    <div className='flex gap-2 mb-8'>
      <input
        type='text'
        placeholder='Enter Pokemon name or ID'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='p-2 border rounded'
      />
      <button 
      onClick={handleSearch}
       className='bg-green-500 text-white px-4 py-2 rounded'>
        Search
      </button>
    </div>
  );
}

export default SearchForm;
