import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { DataContext } from "../../contexts/DataContext";
import { ThemeContext } from "../../contexts/ThemeContext";

import "./styles.css";

import usePokemons from '../../customHooks/usePokemons'

import InfoArea from "../../components/InfoArea";
import SideBar from "../../components/SideBar";
import PageControl from "../../components/PageControl";

export default function PokemonsList() {
  const { types } = useContext(DataContext);
  const { typeColorsLight } = useContext(ThemeContext);

  const { pokemonsView, selectedType, handleSelectType, handleKeyWord, handleSetKeyWord, keyWord, clearResearch } = usePokemons()

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(18);

  

  

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

  return (
    <div className="larger-area">
      <div id="pokemons-list">
        <InfoArea />

        <SideBar  controlType={ {handleSelectType, selectedType} } />

        <div className="listing-area">
          <div className="search">
            <input
              value={keyWord}
              onChange={(e) => handleSetKeyWord(e.target.value)}
              onKeyDown={(e) => handleKeyWord(e)}
            />
            <button type="button" onClick={() => clearResearch()}>
              <IoIosCloseCircleOutline size={40} color="#888" />
            </button>
          </div>

          <div className="container">
            <div className="inner-container">
              <div className="list">
                {pokemonsView
                  .slice(
                    (currentPage - 1) * pageLength,
                    currentPage * pageLength
                  )
                  .map((pokemon) => {
                    return (
                      <Link
                        key={pokemon.id}
                        to={`/details/${pokemon.id}`}
                        className="card"
                      >
                        <div
                          className="avatar-container"
                          style={{
                            background:
                              typeColorsLight[
                                types
                                  .map((type) => type.name)
                                  .indexOf(pokemon.types[0])
                              ],
                          }}
                        >
                          <img
                            src={pokemon.avatar}
                            alt={pokemon.name}
                            width="100px"
                          />
                        </div>
                        <div className="name-container">
                          <h4>{pokemon.name}</h4>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>

          <PageControl
            pageControl={{
              decreasePage,
              increasePage,
              prevPage,
              nextPage,
              pageLength,
              currentPage,
              pokemonsView,
            }}
          />
        </div>
      </div>
    </div>
  );
}
