import { createContext, useState, useEffect } from "react";
import typeSymbols from "../images/symbols";
import api from "../services/api";
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(-1);
  const [typeInfo, setTypeInfo] = useState("");

  const typeColorsLight = [
    "#E6E6D9",
    "#FFDCDC",
    "#E2E7FF",
    "#F4D9FF",
    "#FFD8B2",
    "#FBF2E1",
    "#EAFEC0",
    "#C5D6FF",
    "#D6EEF3",
    "#FFF0DE",
    "#DEF3FF",
    "#CEFFB5",
    "#FFFAB7",
    "#FFDFD9",
    "#D9FAFF",
    "#BAE7FF",
    "#E7E7E7",
    "#FEEBFF",
  ];
  const typeColorsDark = [
    "#64645A",
    "#BE213F",
    "#435ACA",
    "#973EBC",
    "#C46200",
    "#AB966E",
    "#719D18",
    "#264795",
    "#357786",
    "#E87F09",
    "#1D82A5",
    "#1DA90A",
    "#D8B50A",
    "#F14768",
    "#2CB4B4",
    "#0E638F",
    "#383838",
    "#E26EDC",
  ];

  useEffect(() => {
    if(selectedTypeIndex!==-1){
      api
        .get(`type/${selectedTypeIndex + 1}`)
        .then((response) => setTypeInfo(response.data));
    }
  }, [selectedTypeIndex]);


  function selectTypeIndex(typeIndex) {
    setSelectedTypeIndex(typeIndex);
  }

  return (
    <ThemeContext.Provider
      value={{
        selectTypeIndex,
        selectedTypeIndex,
        typeColorsLight,
        typeColorsDark,
        typeSymbols,
        typeInfo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
