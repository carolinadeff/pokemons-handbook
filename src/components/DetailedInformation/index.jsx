import React, { useContext } from "react";

import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";

import { DataContext } from "../../contexts/DataContext";

import "./styles.css";

export default function DetailedInformation({ pokemonsInfo }) {
  const { pokemon, speciesInfo, evolutionChain } = pokemonsInfo;
  const { pokemons } = useContext(DataContext);

  const stats = pokemon.stats
    ? pokemon.stats.map((stat) => [stat.stat.name, stat.base_stat])
    : "indisponível =/";

  const evolChain = [evolutionChain.species.name];
  let evol = evolutionChain.evolves_to;

  while (true) {
    if (evol.length === 0) break;
    evolChain.push(evol[0].species.name);
    evol = evol[0].evolves_to;
  }

  const evolutionChainArray = pokemons.filter((pokemon) =>
    evolChain.includes(pokemon.name)
  );

  return (
    <section className="detailed-informations">
      <h3>Cadeia de evolução</h3>
      <div className="evolution-chain">
        {evolutionChainArray.map((evolutionStep, i) => {
          return (
            <>
              {i !== 0 ? (
                <div className="seta">
                  <IoIosArrowDropright size={40} color="#888" />
                </div>
              ) : (
                ""
              )}
              <Link to={`/details/${evolutionStep.id}`} className="evol-step">
                <img src={evolutionStep.avatar} alt={evolutionStep.name} />
                <p
                  className={
                    evolutionStep.name === pokemon.name
                      ? "selected-pokemon"
                      : ""
                  }
                >
                  {evolutionStep.name}
                </p>
              </Link>
            </>
          );
        })}
      </div>

      <h3>Comportamento</h3>
      <div className="behavior">
        <section>
          <h4>Habilidades</h4>
          <div className="abilities">
            {pokemon.abilities
              ? pokemon.abilities.map((ability) => {
                  return (
                    <div>
                      <h4>{ability.ability.name}</h4>
                      {ability.is_hidden && <h6>habilidade oculta</h6>}
                    </div>
                  );
                })
              : "indisponível =/"}
          </div>
        </section>
        <section>
          <h4>Stats</h4>
          <div className="stats">
            {stats.map((stat) => {
              return (
                <div className="stat-detail">
                  <h4>{stat[0]}</h4>
                  <h5>{stat[1]}</h5>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <h3>Forma</h3>
      <div className="shape">
        <div>
          <h4>Forma</h4>
          <h4>{speciesInfo.shape.name}</h4>
        </div>
        <div>
          <h4>Altura</h4>
          <h4>
            {pokemon.height / 10}m/
            {(pokemon.height / 3.05).toFixed(1)}ft
          </h4>
        </div>
        <div>
          <h4>Peso</h4>
          <h4>
            {pokemon.weight / 10}Kg/
            {(pokemon.weight / 4.54).toFixed(1)}lbs
          </h4>
        </div>
      </div>
    </section>
  );
}
