import React, { useContext } from 'react';
import background from '../../images/background/main_background.jpg';
import './styles.css';

import { ThemeContext } from '../../contexts/ThemeContext'

export default function Background({ children }) {
    const { selectedTypeIndex, typeColorsDark, typeSymbols } = useContext(ThemeContext);

    if(selectedTypeIndex===-1){
        return(
            <div id="background" style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,.3)), url(${background})`, backgroundSize: '50%', backgroundPositionY: '90%', backgroundPositionX: '100%', backgroundRepeat:'repeat-x'}}>
                <header className="background-header">
                    <h2>The Pokemons Handbook</h2>
                </header>
                { children }
                <footer className="background-footer">Autor dos símbolos dos tipos de Pokémons: https://es.wikipedia.org/wiki/Usuario:Andreuvv </footer>
            </div>
        )    
    }else{
        return(
            <div id="background" style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,.1)), url(${typeSymbols[selectedTypeIndex]})`, backgroundSize: '950px', backgroundPositionY: '-150px', backgroundPositionX: '850px', backgroundRepeat: 'no-repeat'}}>
                <header className="background-header" style={{background: typeColorsDark[selectedTypeIndex]}}>
                    <h2>The Pokemons Handbook</h2>
                </header>
                { children }
                <footer className="background-footer" style={{background: typeColorsDark[selectedTypeIndex]}}>Autor dos símbolos dos tipos de Pokémons: https://es.wikipedia.org/wiki/Usuario:Andreuvv </footer>
            </div>
        )
    }

    
}

