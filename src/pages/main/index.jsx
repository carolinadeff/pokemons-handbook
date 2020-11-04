import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { DataContext } from "../../contexts/DataContext";
import { ThemeContext } from "../../contexts/ThemeContext";

import "./styles.css";

import InfoArea from "../../components/InfoArea";
import SideBar from "../../components/SideBar";
import PageControl from "../../components/PageControl";

export default function PokemonsList() {
  const { pokemons, types } = useContext(DataContext);
  const { typeColorsLight, selectTypeIndex } = useContext(ThemeContext);

  const [selectedType, setSelectedType] = useState('');

  const [pokemonsTypeFiltered, setPokemonsTypeFiltered] = useState(pokemons);
  const [pokemonsResearchFiltered, setPokemonsResearchFiltered] = useState(pokemons);
  const [pokemonsView, setPokemonsView] = useState(pokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLength, setPageLength] = useState(18);

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
    setCurrentPage(1);
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

  return (
    <div className="larger-area">
      <div id="pokemons-list">
        <InfoArea />

        <SideBar  controlType={ {handleSelectType, selectedType} } />

        <div className="listing-area">
          <div className="search">
            <input
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
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
