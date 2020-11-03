import "./styles.css";
import { DataProvider } from "./contexts/DataContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Background from "./components/Background";
import Routes from "./routes";
import InfoArea from "./components/InfoArea";


function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <Background>
          <InfoArea/>
          <Routes />
        </Background>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
