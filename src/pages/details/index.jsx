import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import api from "../../services/api";
import "./styles.css";

import { IoIosCloseCircleOutline } from "react-icons/io";

import LoadingPage from "../../components/LoadingPage";
import DetailedInformation from "../../components/DetailedInformation";
import MainInformation from "../../components/MainInformation";


export default function PokemonDetails() {

  const { id } = useParams();

  const [pokemon, setPokemon] = useState({});
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [speciesInfo, setSpeciesInfo] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    (async () => {
      const response = await api.get(`pokemon/${id}`);
      setPokemon(response.data);

      const responseSpecies = await Axios.get(response.data.species.url);
      setSpeciesInfo(responseSpecies.data)

      const responseEvolutionChain = await Axios.get(
        responseSpecies.data.evolution_chain.url
      );
      setEvolutionChain(responseEvolutionChain.data.chain);

      setLoading(false);
    })();
    
  }, [id]);


  if (loading) {
    return <LoadingPage />;
  }


  return (

    <div id="pokemon-details-container">
      <div className="pokemon-details">

        <Link to='/' className="close-details">
          <IoIosCloseCircleOutline size={40} color="darkRed"/>
        </Link>
        
        <MainInformation pokemonsInfo={{ pokemon, speciesInfo }}/>
        <DetailedInformation pokemonsInfo={{ pokemon, speciesInfo, evolutionChain }}/>

      </div>
    </div>

  )
}
