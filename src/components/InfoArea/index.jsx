import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./styles.css";

import instructions from "./instructions";

export default function InfoArea() {
  const {
    selectedTypeIndex,
    typeColorsDark,
    typeSymbols,
    typeInfo,
  } = useContext(ThemeContext);

  if (selectedTypeIndex !== -1 && typeInfo !== "") {
    const {
      damage_relations: {
        double_damage_from,
        double_damage_to,
        half_damage_from,
        half_damage_to,
        no_damage_from,
        no_damage_to,
      },
    } = typeInfo;

    const damages = (intensity, damage) => {
      if (damage.length === 0) {
        return <div><div>{intensity}</div></div>;
      }
      return (
        <div>
          <div>{intensity}</div>
          {damage.map((damage, i) => (
            <p key={i}>{damage.name}</p>
          ))}
        </div>
      );
    };

    return (
      <section id="info-area">
        <img src={typeSymbols[selectedTypeIndex]} alt={typeInfo.name} />

        <div className="type-info">
          <section className="hability">
            <h4>Tipo de habilidade:</h4>
            <div>
              <p>
                {typeInfo.move_damage_class
                  ? typeInfo.move_damage_class.name
                  : ""}
              </p>
            </div>
          </section>

          <section className="caused-damages">
            <div className="text">
              <h4>Danos causados aos outros Pokemons:</h4>
            </div>
            <div
              className="damages-container"
              style={{ background: typeColorsDark[selectedTypeIndex] }}
            >
              {damages("2 X", double_damage_to)}
              {damages("1/2 X", half_damage_to)}
              {damages("0 X", no_damage_to)}
            </div>
          </section>

          <section className="suffered-damages">
            <div className="text">
              <h4>Danos sofridos pelos outros Pokemons:</h4>
            </div>
            <div
              className="damages-container"
              style={{ background: typeColorsDark[selectedTypeIndex] }}
            >
              {damages("2 X", double_damage_from)}
              {damages("1/2 X", half_damage_from)}
              {damages("0 X", no_damage_from)}
            </div>
          </section>
        </div>
      </section>
    );
  }

  return (
    <section id="info-area">
      <div className="instructions">{instructions}</div>
    </section>
  );
}
