import Routes from "./routes";
import "./styles.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from './components/header'

function App() {
  return (
    <ThemeProvider>
        <div id="all">
          <Header />
          <Routes />
        </div>
    </ThemeProvider>
  );
}

export default App;
