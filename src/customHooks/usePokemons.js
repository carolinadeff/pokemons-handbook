import { useState, useEffect, useContext } from 'react';

import { ThemeContext } from "../contexts/ThemeContext";
import { DataContext } from "../contexts/DataContext";

export default function usePokemons() {
    const { selectTypeIndex } = useContext(ThemeContext);
    const { pokemons, types } = useContext(DataContext);
    
    const [selectedType, setSelectedType] = useState('');
    const [pokemonsTypeFiltered, setPokemonsTypeFiltered] = useState(pokemons);
    const [pokemonsResearchFiltered, setPokemonsResearchFiltered] = useState(pokemons);
    const [pokemonsView, setPokemonsView] = useState(pokemons);
    const [keyWord, setKeyWord] = useState("");

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

      }, [pokemonsTypeFiltered, pokemonsResearchFiltered, pokemons]);
    
      function handleSelectType(type) {
        if(selectedType===type){
          setSelectedType('');
          setPokemonsTypeFiltered(pokemons);
          selectTypeIndex(-1);
        }else{
          setSelectedType(type);
          setPokemonsTypeFiltered(pokemons.filter((pokemon) => pokemon.types.includes(type))); 
          selectTypeIndex(types.map(type => type.name).indexOf(type));
        }
      }

      function handleSetKeyWord(word){
          setKeyWord(word)
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

      return { pokemonsView, selectedType, handleSelectType, handleKeyWord, handleSetKeyWord, keyWord ,clearResearch }
}