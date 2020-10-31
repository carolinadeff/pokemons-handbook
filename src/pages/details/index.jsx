import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from "../../services/api";

export default function PokemonDetails() {
    const [pokemon, setPokemon] = useState({})
    const { id } = useParams();

    useEffect(() => {
        api.get(`pokemon/${id}`)
            .then(response => setPokemon(response.data))
    }) 


    return (
        <div>
            <p>{pokemon.name}</p>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="pokemon"/>
        </div>
    )
}