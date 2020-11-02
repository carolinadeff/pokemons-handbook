import { createContext, useState } from "react";
import typeSymbols from '../images/symbols';
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(-1)
    
  const typeColorsLight = ['#B6B6A1', '#FF728D', '#A3B1F4', '#DBA9F0', '#F3A557', '#E3D2B1', '#B7DC6D', '#7296EF', '#6BB3C4', '#FAC588', '#93CCED', '#68F156', '#FFE256', '#FF9DA5', '#95EAEA', '#58BBF0', '#A6A6A6', '#F8B4F4']
  const typeColorsDark = ['#64645A', '#BE213F', '#435ACA', '#973EBC', '#C46200', '#AB966E', '#719D18', '#264795', '#357786', '#E87F09', '#1D82A5', '#1DA90A', '#D8B50A', '#F14768', '#2CB4B4', '#0E638F', '#383838', '#E26EDC']


  function selectTypeIndex(typeIndex) {
    setSelectedTypeIndex(typeIndex)
  }

  return (
    <ThemeContext.Provider value={{ selectTypeIndex, selectedTypeIndex, typeColorsLight, typeColorsDark, typeSymbols }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
