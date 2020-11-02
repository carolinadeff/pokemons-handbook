import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import  { IoIosCloseCircleOutline } from 'react-icons/io'
import { DataContext } from '../../contexts/DataContext'
import { ThemeContext } from '../../contexts/ThemeContext'

import "./style.css";

import PageControl from '../../components/PageControl'

export default function PokemonsList() {

  const { pokemons, types } = useContext(DataContext);
  const { selectTypeIndex, typeColorsDark, typeSymbols } = useContext(ThemeContext);
  
  const [selectedType, setSelectedType] = useState('');
  const [pokemonsTypeFiltered, setPokemonsTypeFiltered] = useState(pokemons);
  const [pokemonsResearchFiltered, setPokemonsResearchFiltered] = useState(pokemons);
  const [pokemonsView, setPokemonsView] = useState(pokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(18);
  
  const [keyWord, setKeyWord] = useState('');


  useEffect(() => {
    const visible = [];
    pokemonsResearchFiltered.forEach(pokemon => {
      if(pokemonsTypeFiltered.some(pokemonType => {
        return pokemonType.name === pokemon.name
      })) visible.push(pokemon)
    })
    setPokemonsView(visible)
    setCurrentPage(1)
  }, [pokemonsTypeFiltered, pokemonsResearchFiltered])


  function handleSelectType(type) {
    if(selectedType===type){
      setSelectedType('')
      setPokemonsTypeFiltered(pokemons)
      selectTypeIndex(-1)
    }else{
      setSelectedType(type)
      selectTypeIndex(types.map(type => type.name).indexOf(type))
      setPokemonsTypeFiltered(pokemons.filter((pokemon) => pokemon.types.includes(type))); 
    }
  }


  function handleKeyWord(e) {
    const find = [];
    if(e.key === "Enter") {
      const research = new RegExp(keyWord, "i", "g")
      pokemons.forEach(pokemon => {
        if(research.test(pokemon.name)){
          find.push(pokemon)
        }
      }) 
      setPokemonsResearchFiltered(find)    
    }
  }

  function clearResearch() {
    setKeyWord('')
    setPokemonsResearchFiltered(pokemons)
  }

  return (
    <div className="larger-area">
    <div id="pokemons-list">

      <div className="sidebar">
        {types.map((type, index) => {
          return (
            <button 
              key={index}
              type='button'
              onClick={() => handleSelectType(type.name)}
              style={{background: type.name === selectedType ? typeColorsDark[index] : ''}}
            >
              <img src={typeSymbols[index]} alt={type.name} />
              <p>{type.name}</p>
            </button>
          )
        })}
      </div>

      <div className="listing-area">

        <div className="search">
          <input value={keyWord} onChange={(e) => setKeyWord(e.target.value)} onKeyDown={(e) => handleKeyWord(e)}/>
          <button type="button" onClick={() => clearResearch()}>
            <IoIosCloseCircleOutline size={40} color="#888"/>
          </button>
        </div>
   
        <div className="container">
          <div className="inner-container">
            <div className="list">
              {pokemonsView.slice((currentPage-1)*pageLength, currentPage*pageLength).map(pokemon => {
                return (
                  <Link key={pokemon.id} to={`/details/${pokemon.id}`} className="card">
                    <img src={pokemon.avatar} alt={pokemon.name} width="100px"/>
                    <h4>{pokemon.name}</h4>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <PageControl stateControl={ {setCurrentPage, setPageLength, pageLength, currentPage, pokemonsView} } />
        
      </div>
      
    </div>

    </div>
  );
}
