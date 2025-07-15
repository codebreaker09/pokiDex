import { useState, useEffect, useCallback } from 'react';

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [description, setDescription] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleSearch = useCallback(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }, [search]);

  useEffect(() => {
    if (pokemonData?.id) {
      fetch(`https://pokeapi.co/api/v2/characteristic/${pokemonData.id}`)
        .then((res) => res.json())
        .then((characteristic) => {
          const english = characteristic.descriptions.find(
            (desc) => desc.language.name === 'en'
          );
          setDescription(english?.description);
        })
        .catch((err) => {
          console.error('Error:', err);
        });
    }
  }, [pokemonData]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleFavorite = useCallback(() => {
    if (!pokemonData) return;

    const newFavorite = {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      types: pokemonData.types.map((t) => t.type.name),
    };

    const alreadyFavorited = favorites.some(
      (poke) => poke.name === newFavorite.name
    );

    if (!alreadyFavorited) {
      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  }, [favorites, pokemonData]);

  const removeFavorite = useCallback(
    (name) => {
      const updated = favorites.filter((poke) => poke.name !== name);
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    },
    [favorites]
  );

  return {
    handleSearch,
    search,
    setSearch,
    pokemonData,
    description,
    handleFavorite,
    favorites,
    removeFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly,
  };
};

export default useSearch;
