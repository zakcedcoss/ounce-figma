import "./App.css";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import Home from "./pages/Home";
Chart.register(ArcElement, Tooltip, Legend);

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
