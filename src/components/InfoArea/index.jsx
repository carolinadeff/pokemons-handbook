import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./styles.css";

import instructions from "./instructions";

export default function InfoArea() {

  const {
    selectedTypeIndex,
    typeColorsLight,
    typeColorsDark,
    typeSymbols,
    typeInfo,
  } = useContext(ThemeContext);
  
  if(selectedTypeIndex !== -1 && typeInfo !== "") {

    const { 
      damage_relations: { 
        double_damage_from,
        double_damage_to,
        half_damage_from,
        half_damage_to,
        no_damage_from,
        no_damage_to 
      }
    } = typeInfo

    return (
      <section
        id="info-area"
        style={{
          background: typeColorsLight[selectedTypeIndex],
          borderColor: typeColorsDark[selectedTypeIndex],
        }}
      >
        <img src={typeSymbols[selectedTypeIndex]} alt={typeInfo.name} />

        <div className="type-info">
          
          <section className='hability'>
            <h4>Tipo de habilidade:</h4>
            <div style={{background: typeColorsDark[selectedTypeIndex] }}><p>{typeInfo.move_damage_class ? typeInfo.move_damage_class.name : 'none'}</p></div>
          </section>
        
          <section className='caused-damages'>
            <div className="text"><h4>Danos causados aos outros Pokemons:</h4></div> 
            <div className="damages-container" style={{background: typeColorsDark[selectedTypeIndex] }}>
              <div>
              <div>2 x</div>
              {double_damage_to.length > 0 ? (
                double_damage_to.map((damage, i) => <p key={i}>{damage.name}</p>)
              ) : (
                <p>Nenhum</p>
              )}
            </div>
            <div>
            <div>1/2 x</div>
              {half_damage_to.length > 0 ? (
                half_damage_to.map((damage, i) => <p key={i}>{damage.name}</p>)
              ) : (
                <p>Nenhum</p>
              )}
            </div>
            <div>
              <div>0</div>
              {no_damage_to.length > 0 ? (
                no_damage_to.map((damage, i) => <p key={i}>{damage.name}</p>)
              ) : (
                <p>Nenhum</p>
              )}
            </div>
            </div>
          </section>

          <section className='suffered-damages'>
          <div className="text"><h4>Danos sofridos pelos outros Pokemons:</h4></div>
            <div className="damages-container" style={{background: typeColorsDark[selectedTypeIndex] }}>
            <div>
              <div>2 x</div>
              {double_damage_from.length > 0 ? (
                double_damage_from.map((damage, i) => <p key={i}>{damage.name}</p>)
              ) : (
                <p>Nenhum</p>
              )}
            </div>
            <div>
              <div>1/2 x</div>
              {half_damage_from.length > 0 ? (
                half_damage_from.map((damage, i) => <p key={i}>{damage.name}</p>)
              ) : (
                <p>Nenhum</p>
              )}
            </div>
            <div>
              <div>0</div>
              {no_damage_from.length > 0 ? (
                no_damage_from.map((damage, i) => <p key={i}>{damage.name}</p>)
              ) : (
                <p>Nenhum</p>
              )}
            </div>
            </div>
          </section>
         
          
            
        </div>
      </section>
    )

  }

  return (
    <section id="info-area">
      <div className="instructions">{instructions}</div>
    </section>
  );
}
