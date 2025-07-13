import { useState, useEffect } from "react";

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [description, setDescription] = useState('');
  const [favorites, setFavorites] = useState([]);

  const handleSearch = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
    .then((res) => res.json())
    .then((data) => {
      setPokemonData(data)
    })
    .catch((err) => {
      console.error('Error:', err)
    });
  }

  useEffect(() => {
    if(pokemonData?.id){
      fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonData.id}`)
      .then((res) => res.json())
      .then((characteristic) => {
        const english = characteristic.descriptions.find(
          (desc) => desc.language.name === 'en'
        );
        setDescription(english?.description)
      })
      .catch((err) => {
        console.error('Error:', err)
      });
    }
  }, [pokemonData]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleFavorite = () => {
    if(!pokemonData) return;

    const newFavorite = {
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
    };

    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  return {
    handleSearch,
    search,
    setSearch,
    pokemonData,
    description,
    handleFavorite,
    favorites,
  };
};

export default useSearch;