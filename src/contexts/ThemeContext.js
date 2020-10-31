import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [type, setType] = useState([]);
  // const [colors, setColors] = useState({});

  function selectType(types) {
    setType(types);
  }

  useEffect(() => {
      return
    // setColors({
    //   background: backgroundColorList[type],
    //   border: BorderColorList[type],
    // });
  }, [type]);

  return (
    <ThemeContext.Provider value={(selectType)}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
