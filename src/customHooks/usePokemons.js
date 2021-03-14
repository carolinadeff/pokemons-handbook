import { useState, useEffect, useContext } from "react";

import { ThemeContext } from "../contexts/ThemeContext";
import { DataContext } from "../contexts/DataContext";

export default function usePokemons() {
  const { selectTypeIndex } = useContext(ThemeContext);
  const { pokemons, types } = useContext(DataContext);

  const [selectedType, setSelectedType] = useState("");
  const [pokemonsTypeFiltered, setPokemonsTypeFiltered] = useState(pokemons);
  const [pokemonsResearchFiltered, setPokemonsResearchFiltered] = useState(
    pokemons
  );
  const [pokemonsView, setPokemonsView] = useState(pokemons);
  const [keyWord, setKeyWord] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(18);

  useEffect(() => {
    const visible = [];
    pokemonsResearchFiltered.forEach((pokemon) => {
      if (
        pokemonsTypeFiltered.some((pokemonType) => {
          return pokemonType.name === pokemon.name;
        })
      )
        visible.push(pokemon);
    });
    setPokemonsView(visible);
    setCurrentPage(1);
  }, [pokemonsTypeFiltered, pokemonsResearchFiltered, pokemons]);

  function handleSelectType(type) {
    if (selectedType === type) {
      setSelectedType("");
      setPokemonsTypeFiltered(pokemons);
      selectTypeIndex(-1);
    } else {
      setSelectedType(type);
      setPokemonsTypeFiltered(
        pokemons.filter((pokemon) => pokemon.types ? pokemon.types.includes(type) : false)
      );
      selectTypeIndex(types.map((type) => type.name).indexOf(type));
    }
  }

  function handleSetKeyWord(word) {
    setKeyWord(word);
  }

  function handleKeyWord(e) {
    const find = [];
    if (e.key === "Enter") {
      const research = new RegExp(keyWord, "i", "g");
      pokemons.forEach((pokemon) => {
        if (research.test(pokemon.name)) {
          find.push(pokemon);
        }
      });
      setPokemonsResearchFiltered(find);
    }
  }

  function clearResearch() {
    setKeyWord("");
    setPokemonsResearchFiltered(pokemons);
  }

  function increasePage() {
    const lenght = pageLength + 3;
    setPageLength(lenght);
  }

  function decreasePage() {
    const lenght = pageLength - 3;
    setPageLength(lenght);
  }

  function prevPage() {
    const page = currentPage - 1;
    setCurrentPage(page);
  }

  function nextPage() {
    const page = currentPage + 1;
    setCurrentPage(page);
  }

  return {
    pokemonsView,
    selectedType,
    handleSelectType,
    handleKeyWord,
    handleSetKeyWord,
    keyWord,
    clearResearch,
    increasePage,
    decreasePage,
    prevPage,
    nextPage,
    currentPage,
    pageLength,
  };
}
