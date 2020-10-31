import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import typeSymbols from '../../images/symbols';

import api from "../../services/api";
import "./style.css";

export default function PokemonsList() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([])
  const colors = ['#aaac84', '#c72e2b', '#9d8ec7', '#9b409a', '#9b409a']
  

  useEffect(() => {
    api.get('pokemon').then(response => setPokemons(response.data.results));
    api.get('type').then(response => setTypes(response.data.results.slice(0,18)))

  }, []);

  return (
    <div id="pokemons-list">

      <div className="sidebar">
        {types.map((type, index) => {
          return (
            <button type='button' style={{ background: colors[index] }}>
              <img src={typeSymbols[index]} alt={type.name} />
              <p>{type.name}</p>
            </button>
          )
        })}
      </div>

      <div className="list">
        {pokemons.map((pokemon, index) => {
          return (
            <Link key={index} to={`/details/${index + 1}`} class="card">
              <img src={` https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`} alt="Pokemon" width="100px"/>
              <h4>{pokemon.name}</h4>
            </Link>
          );
        })}
      </div>

      
      
    </div>
  );
}
