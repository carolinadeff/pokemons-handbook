import { createContext, useState, useEffect } from "react";

import Axios from "axios";
import api from "../services/api";

const DataContext = createContext();

function DataProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await api.get("pokemon/?limit=1050");
      const { results } = response.data;
      const pokemonsList = await results.map((pokemon) => {
        const completePokemon = {};
        Axios.get(pokemon.url).then((response) => {
          completePokemon.id = response.data.id;
          completePokemon.name = pokemon.name;
          completePokemon.types = response.data.types.map(
            (item) => item.type.name
          );
          completePokemon.avatar =
            response.data.sprites.other.dream_world.front_default;
        });
        return completePokemon;
      });

      setPokemons(pokemonsList);

      const typesResponse = await api.get("type");
      const typesList = typesResponse.data.results.slice(0, 18);
      setTypes(typesList);

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <DataContext.Provider value={{ pokemons, types }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataProvider };
