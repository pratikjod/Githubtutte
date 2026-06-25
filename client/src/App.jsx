import { HashRouter } from "react-router-dom";
import RoutesFile from "./routes";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <RoutesFile />
    </HashRouter>
  );
}

export default App;