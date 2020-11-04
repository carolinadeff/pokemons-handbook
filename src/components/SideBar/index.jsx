import React, { useContext, useState } from 'react';

import { ThemeContext } from "../../contexts/ThemeContext";
import { DataContext } from "../../contexts/DataContext";

import './styles.css';


export default function SideBar({ typeInfo }) {

    const {setPokemonsTypeFiltered} = typeInfo

    const { selectTypeIndex, typeColorsDark, typeSymbols } = useContext(ThemeContext);
    const { pokemons, types } = useContext(DataContext);

    const [selectedType, setSelectedType] = useState('');

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

    return (
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
    )
}