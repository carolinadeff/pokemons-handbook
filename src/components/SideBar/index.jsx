import React, { useContext } from 'react';

import { ThemeContext } from "../../contexts/ThemeContext";
import { DataContext } from "../../contexts/DataContext";

import './styles.css';


export default function SideBar({controlType}) {

    const { handleSelectType, selectedType } = controlType

    const { typeColorsDark, typeSymbols } = useContext(ThemeContext);
    const { types } = useContext(DataContext);

    


    return (
        <div className="sidebar">
        {types.map((type, index) => {
          return (
            <button 
              key={index}
              type='button'
              onClick={() => handleSelectType(type.name)}
              style={{background: type.name === selectedType ? typeColorsDark[index] : ''}}
            >
              <img src={typeSymbols[index]} alt={type.name} />
              <p>{type.name}</p>
            </button>
          )
        })}
      </div>
    )
}