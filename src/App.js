import "./styles.css";
import { DataProvider } from "./contexts/DataContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Background from "./components/Background";
import Routes from "./routes";



function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <Background>
          
          <Routes />
        </Background>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
