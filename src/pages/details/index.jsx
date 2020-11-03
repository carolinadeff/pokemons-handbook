import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import api from "../../services/api";
import './styles.css';

import LoadingPage from '../../components/LoadingPage';


export default function PokemonDetails() {
    const { id } = useParams();

    const [pokemon, setPokemon] = useState({})

    const [evolutionChain, setEvolutionChain] = useState('')
    const [eggGroups, setEggGroups] = useState([])
    const [habitat, setHabitat] = useState('')

    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        (async()=>{
            const response = await api.get(`pokemon/${id}`);
            setPokemon(response.data)

            const responseSpecies = await Axios.get(response.data.species.url);

            setEggGroups(responseSpecies.data.egg_groups)
            setHabitat(responseSpecies.data.habitat.name)

            const responseEvolutionChain = await Axios.get(responseSpecies.data.evolution_chain.url)
            const { chain } = responseEvolutionChain.data;
            const evolChain = [chain.species.name];
            
            let evol = chain.evolves_to

            while (true) {
                if (evol.length === 0) break;
                evolChain.push(evol[0].species.name);
                evol = evol[0].evolves_to;
            }

            setEvolutionChain(evolChain)

            setLoading(false)
        })()
        
    }, [id]) 


    if (loading) {
        return <LoadingPage />
    }

    console.log(evolutionChain)

    const organizedPokemon = {
        name:pokemon.name,
        image: pokemon.sprites.other['official-artwork'].front_default ? pokemon.sprites.other['official-artwork'].front_default : pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types.map(type => type.type.name),
        height: pokemon.height,
        wight:pokemon.weight,
        abilities: pokemon.abilities,
        stats: pokemon.stats,

    }
    
    return (
        <div id="pokemon-details-container">
            <div className='pokemon-details'>
                <p>{pokemon.name}</p>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="pokemon"/>
            </div>
        </div>
        
    )
}