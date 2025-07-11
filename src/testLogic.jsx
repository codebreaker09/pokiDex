import React,{ useEffect, useState } from 'react';

const NewSearch = () => {
  const [search, setSearch] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState('');

  const handleSearch = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data);
      })
      .catch((err) => {
        console.error(err, 'Error');
        setPokemonData(null);
        setPokemonDescription('');
      });
  };

  useEffect(() => {
    if (pokemonData?.id) {
      fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonData.id}/`)
        .then((res) => res.json())
        .then((characteristics) => {
          const english = characteristics.descriptions.find(
            (d) => d.language.name === 'en'
          );
          setPokemonDescription(english?.description || 'No description');
        })
        .catch((err) => {
          console.error(err, 'Error');
        });
    }
  }, [pokemonData]);

  return (
    <div>
      <h1>Pokedex</h1>
      <input
        type='text'
        value={search}
        placeholder='Search by name or id'
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Type: {pokemonData.types.map((t) => t.type.name).join(', ')}</p>
          <p>Description: {pokemonDescription}</p>
        </div>
      )}
    </div>
  );
};

export default NewSearch;
