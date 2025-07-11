import { useState, useEffect } from 'react';

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [description, setDescription] = useState('');

  const handleSearch = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then((res) => res.json())
      .then((pokemon) => {
        setPokemonData(pokemon);
      })
      .catch((err) => {
        console.error(err, 'Error');
      });
  };

  useEffect(() => {
    if (pokemonData?.id) {
      fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonData.id}`)
        .then((res) => res.json())
        .then((characteristic) => {
          const english = characteristic.descriptions.find(
            (desc) => desc.language.name === 'en'
          );
          setDescription(english.description);
        })
        .catch((err) => {
          console.error(err, 'Error');
        });
    }
  }, [pokemonData]);

  return {
    handleSearch,
    search,
    setSearch,
    pokemonData,
    description,
  };
};

export default useSearch;
