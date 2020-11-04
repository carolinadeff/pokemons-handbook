import React, { useContext } from 'react';

import { ThemeContext } from "../../contexts/ThemeContext";
import { DataContext } from "../../contexts/DataContext";

import './styles.css';

export default function MainInformation({ pokemonsInfo }) {

    const { pokemon, speciesInfo } = pokemonsInfo

    const { typeColorsDark } = useContext(ThemeContext);
    const { types } = useContext(DataContext);


    const darkTypeColors = pokemon.types.map(
        (type) =>
          typeColorsDark[
            types.map((insideType) => insideType.name).indexOf(type.type.name)
          ]
      );
      
      const pokemonImage = pokemon.sprites.other["official-artwork"].front_default
        ? pokemon.sprites.other["official-artwork"].front_default
        : pokemon.sprites.other.dream_world.front_default;
      
      const eggGroups = speciesInfo.egg_groups ? speciesInfo.egg_groups.map((eggGroupItem) => eggGroupItem.name).join(" e ") : "indisponível =/";
    const habitat = speciesInfo.habitat ? speciesInfo.habitat.name : "indisponível =/";
    
    return(
        <section className="main-informations">
          <div className="pokemon-name">
            <h2>{pokemon.name}</h2>
          </div>
          <ul className="pokemon-basic-info">
            <li>
              Habitat: <strong>{habitat}</strong>
            </li>
            <li>
              Grupos de ovos: <strong>{eggGroups}</strong>
            </li>
            <li>
              Tipos:{" "}
              {pokemon.types.map((type, i) => (
                <div
                  className="type-container"
                  style={{ background: darkTypeColors[i] }}
                >
                  {type.type.name}
                </div>
              ))}
            </li>
          </ul>
          <img className="main-image" src={pokemonImage} alt="pokemon" />
        </section>
    )
}