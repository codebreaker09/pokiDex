import { useState, useCallback, useEffect } from 'react';

const useSearch = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [search, setSearch] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  const [characteristicsData, setCharacteristicsData] = useState(null);

  const handleSearch = useCallback(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Pokemon no found');
        }
        return res.json();
      })
      .then((data) => {
        setPokemonData(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err, 'Error');
        setPokemonData(null);
      });
  }, [search]);

  const handleOnChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    if (pokemonData?.id) {
      fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonData.id}/`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Pokemon no found');
          }
          return res.json();
        })
        .then((characteristicsResponse) => {
          setCharacteristicsData(characteristicsResponse);
        })
        .catch((err) => {
          console.error(err, 'Error');
          setCharacteristicsData(null);
        });
    }
  },[pokemonData?.id]);

  /*
  Optional Chaining:
  ?. protects us against errors when a property is not present
  
  Examples:
  pokemonData = {} || [] || { foobar: 'foo' } || undefined
  pokemonData.id ===> ERROR!!
  pokemonData?.id ===> undefined

  Your next task:
  1. Get description and any other fun pieces of data from the data we get from this endpoint: `https://pokeapi.co/api/v2/characteristic/${pokemonData.id}/` onto the page / card
  2. Bonus: Create a way to save your favorite card
  */

  return {
    handleSearch,
    pokemonData,
    search,
    characteristicsData,
    handleOnChange,
  };
};

export default useSearch;
