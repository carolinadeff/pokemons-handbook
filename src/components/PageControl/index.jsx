import React from "react";
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import "./styles.css";

import usePokemons from "../../customHooks/usePokemons";

export default function PageControl() {
  const {
    decreasePage,
    increasePage,
    prevPage,
    nextPage,
    pageLength,
    currentPage,
    pokemonsView,
  } = usePokemons();

  return (
    <footer className="page-control">
      <div>
        <button
          type="button"
          disabled={pageLength >= 36}
          onClick={() => increasePage()}
        >
          <IoIosAddCircleOutline size={40} color="#888" />
        </button>
        <button
          type="button"
          disabled={pageLength <= 6}
          onClick={() => decreasePage()}
        >
          <IoIosRemoveCircleOutline size={40} color="#888" />
        </button>
        <p>{pageLength} pokemons por página</p>
      </div>
      <div>
        <p>
          Página {currentPage} de{" "}
          {parseInt(pokemonsView.length / pageLength + 1)}
        </p>
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => prevPage()}
        >
          <IoIosArrowDropleft size={40} color="#888" />
        </button>
        <button
          type="button"
          disabled={currentPage * pageLength >= pokemonsView.length}
          onClick={() => nextPage()}
        >
          <IoIosArrowDropright size={40} color="#888" />
        </button>
      </div>
    </footer>
  );
}
